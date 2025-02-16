import { Injectable } from '@nestjs/common'
import { SendNotificationUseCase } from '../use-cases/sendNotification'
import { DomainEvents } from '@/core/events/domainEvents'
import { EventHandler } from '@/core/events/eventHandler'
import { AnswersRepository } from '@/domain/forum/application/repositories/answersRepository'
import { QuestionBestAnswerChosenEvent } from '@/domain/forum/enterprise/events/questionBestAnswerChosenEvent'

@Injectable()
export class OnQuestionBestAnswerChosen implements EventHandler {
  constructor(
    private answerRepository: AnswersRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendQuestionBestAnswerNotification.bind(this),
      QuestionBestAnswerChosenEvent.name,
    )
  }

  private async sendQuestionBestAnswerNotification({
    question,
    bestAnswerId,
  }: QuestionBestAnswerChosenEvent) {
    const answer = await this.answerRepository.findById(bestAnswerId.toString())

    if (answer) {
      await this.sendNotification.execute({
        recipientId: answer.authorId.toString(),
        title: 'Sua resposta foi escolhida!',
        content: `A resposta que você enviou em "${question.title
          .substring(0, 20)
          .concat('...')}" foi escolhida pelo autor!`,
      })
    }
  }
}
