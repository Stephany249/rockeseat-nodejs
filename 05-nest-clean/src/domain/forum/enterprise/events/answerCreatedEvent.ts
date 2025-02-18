import { Answer } from '../entities/answer'
import { UniqueEntityID } from '@/core/entities/uniqueEntityId'
import { DomainEvent } from '@/core/events/domainEvent'

export class AnswerCreatedEvent implements DomainEvent {
  public ocurredAt: Date
  public answer: Answer

  constructor(answer: Answer) {
    this.answer = answer
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.answer.id
  }
}
