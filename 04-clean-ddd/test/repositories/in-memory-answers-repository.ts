import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository"
import { Answer } from "@/domain/forum/enterprise/entities/answer"

export class InMemoryAnswersRepository implements AnswersRepository {
  public answers: Answer[] = []

  async findById(id: string) {
    const answer = this.answers.find((answer) => answer.id.toString() === id)

    if (!answer) {
      return null
    }

    return answer
  }

  async create(answer: Answer) {
    this.answers.push(answer)
  }

  async save(answer: Answer) {
    const index = this.answers.findIndex((q) => q.id === answer.id)

    this.answers[index] = answer
  }

  async delete(answer: Answer) {
    const index = this.answers.findIndex((a) => a.id === answer.id)

    this.answers.splice(index, 1)
  }
}