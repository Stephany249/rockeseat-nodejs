import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public questions: Question[] = []

  async findById(id: string) {
    const question = this.questions.find((question) => question.id.toString() === id)

    if (!question) {
      return null
    }

    return question
  }

  async findBySlug(slug: string) {
    const question = this.questions.find(
      (question) => question.slug.value === slug,
    )

    if (!question) {
      return null
    }

    return question
  }

  async create(question: Question) {
    this.questions.push(question)
  }

  async save(question: Question) {
    const index = this.questions.findIndex((q) => q.id === question.id)

    this.questions[index] = question
  }

  async delete(question: Question) {
    const index = this.questions.findIndex((q) => q.id === question.id)

    this.questions.splice(index, 1)
  }
}
