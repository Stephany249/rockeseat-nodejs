import { DomainEvents } from '@/core/events/domainEvents'
import { StudentsRepository } from '@/domain/forum/application/repositories/studentsRepository'

import { Student } from '@/domain/forum/enterprise/entities/student'

export class InMemoryStudentsRepository implements StudentsRepository {
  public students: Student[] = []

  async findByEmail(email: string) {
    const student = this.students.find((student) => student.email === email)

    if (!student) {
      return null
    }

    return student
  }

  async create(student: Student) {
    this.students.push(student)

    DomainEvents.dispatchEventsForAggregate(student.id)
  }
}
