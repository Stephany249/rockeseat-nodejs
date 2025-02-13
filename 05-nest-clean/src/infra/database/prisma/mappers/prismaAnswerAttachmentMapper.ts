import { Attachment as PrismaAttachment } from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/uniqueEntityId'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answerAttachment'

export class PrismaAnswerAttachmentMapper {
  static toDomain(raw: PrismaAttachment): AnswerAttachment {
    if (!raw.answerId) {
      throw new Error('Invalid attachment type.')
    }

    return AnswerAttachment.create(
      {
        attachmentId: new UniqueEntityID(raw.id),
        answerId: new UniqueEntityID(raw.answerId),
      },
      new UniqueEntityID(raw.id),
    )
  }
}
