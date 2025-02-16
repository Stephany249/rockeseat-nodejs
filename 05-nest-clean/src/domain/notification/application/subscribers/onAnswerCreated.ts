import { Injectable } from '@nestjs/common'
import { SendNotificationUseCase } from '../use-cases/sendNotification'
import { DomainEvents } from '@/core/events/domainEvents'
import { EventHandler } from '@/core/events/eventHandler'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questionsRepository'
import { AnswerCreatedEvent } from '@/domain/forum/enterprise/events/answerCreatedEvent'

@Injectable()
export class OnAnswerCreated implements EventHandler {
  constructor(
    private questionsRepository: QuestionsRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewAnswerNotification.bind(this),
      AnswerCreatedEvent.name,
    )
  }

  private async sendNewAnswerNotification({ answer }: AnswerCreatedEvent) {
    const question = await this.questionsRepository.findById(
      answer.questionId.toString(),
    )

    if (question) {
      await this.sendNotification.execute({
        recipientId: question.authorId.toString(),
        title: `Nova resposta em "${question.title.substring(0, 40).concat('...')}"`,
        content: answer.excerpt,
      })
    }
  }
}
