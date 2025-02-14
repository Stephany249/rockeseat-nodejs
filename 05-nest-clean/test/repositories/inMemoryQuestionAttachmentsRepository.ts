import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/questionAttachmentsRepository'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/questionAttachment'

export class InMemoryQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  public questionAttachments: QuestionAttachment[] = []

  async findManyByQuestionId(questionId: string) {
    const questionAttachments = this.questionAttachments.filter(
      (attachment) => attachment.questionId.toString() === questionId,
    )

    return questionAttachments
  }

  async createMany(attachments: QuestionAttachment[]): Promise<void> {
    this.questionAttachments.push(...attachments)

  }

  async deleteMany(attachments: QuestionAttachment[]): Promise<void> {
    const questionAttachments = this.questionAttachments.filter(
      (questionAttachment) => {
        return !attachments.some((attachment) => attachment.equals(questionAttachment))
      }
    )

    this.questionAttachments = questionAttachments
  }

  async deleteManyByQuestionId(questionId: string) {
    const questionAttachments = this.questionAttachments.filter(
      (attachment) => attachment.questionId.toString() !== questionId,
    )
    this.questionAttachments = questionAttachments
  }
}
