import { Injectable } from '@nestjs/common'

import { Student } from '../../enterprise/entities/student'
import { HashGenerator } from '../cryptography/hashGenerator'
import { StudentsRepository } from '../repositories/studentsRepository'
import { StudentsAlreadyExistsError } from './errors/studentsAlreadyExistsError'
import { Either, left, right } from '@/core/either'

interface RegisterStudentUseCaseRequest {
  name: string
  email: string
  password: string
}

type RegisterStudentUseCaseResponse = Either<
  StudentsAlreadyExistsError,
  {
    student: Student
  }
>

@Injectable()
export class RegisterStudentUseCase {
  constructor(
    private studentsRepository: StudentsRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterStudentUseCaseRequest): Promise<RegisterStudentUseCaseResponse> {
    const userWithSameEmail = await this.studentsRepository.findByEmail(email)

    if (userWithSameEmail) {
      return left(new StudentsAlreadyExistsError(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const student = Student.create({
      name,
      email,
      password: hashedPassword,
    })

    await this.studentsRepository.create(student)

    return right({ student })
  }
}
