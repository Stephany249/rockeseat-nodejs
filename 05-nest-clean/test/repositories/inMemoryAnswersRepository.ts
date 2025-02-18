import { DomainEvents } from '@/core/events/domainEvents'
import { PaginationParams } from '@/core/repositories/paginationParams'
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answerAttachmentsRepository'
import { AnswersRepository } from '@/domain/forum/application/repositories/answersRepository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  public answers: Answer[] = []

  constructor(
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  async findById(id: string) {
    const answer = this.answers.find((answer) => answer.id.toString() === id)

    if (!answer) {
      return null
    }

    return answer
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const answers = this.answers
      .filter((answer) => answer.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return answers
  }

  async create(answer: Answer) {
    this.answers.push(answer)

    await this.answerAttachmentsRepository.createMany(
      answer.attachments.getItems(),
    )

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async save(answer: Answer) {
    const index = this.answers.findIndex((q) => q.id === answer.id)

    this.answers[index] = answer

    await this.answerAttachmentsRepository.createMany(
      answer.attachments.getNewItems(),
    )
    
    await this.answerAttachmentsRepository.deleteMany(
      answer.attachments.getRemovedItems(),
    )

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async delete(answer: Answer) {
    const index = this.answers.findIndex((a) => a.id === answer.id)

    this.answers.splice(index, 1)

    this.answerAttachmentsRepository.deleteManyByAnswerId(answer.id.toString())
  }
}
