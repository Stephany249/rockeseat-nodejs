import { AnswerAttachment } from '../../enterprise/entities/answerAttachment'

export abstract class AnswerAttachmentsRepository {
  abstract findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]>
  abstract createMany(attachments: AnswerAttachment[]): Promise<void>
  abstract deleteMany(attachments: AnswerAttachment[]): Promise<void>
  abstract deleteManyByAnswerId(answerId: string): Promise<void>
}
