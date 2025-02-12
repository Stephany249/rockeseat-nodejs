import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answerAttachmentsRepository'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answerAttachment'

export class InMemoryAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  public answerAttachment: AnswerAttachment[] = []

  async findManyByAnswerId(answerId: string) {
    const answerAttachments = this.answerAttachment.filter(
      (attachment) => attachment.answerId.toString() === answerId,
    )
    return answerAttachments
  }

  async deleteManyByAnswerId(answerId: string) {
    const answerAttachments = this.answerAttachment.filter(
      (attachment) => attachment.answerId.toString() !== answerId,
    )
    this.answerAttachment = answerAttachments
  }
}
