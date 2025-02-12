import { Injectable } from '@nestjs/common'

import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/questionAttachmentsRepository'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/questionAttachment'

@Injectable()
export class PrismaQuestionAttachmentRepository
  implements QuestionAttachmentsRepository
{
  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]> {
    throw new Error('Method not implemented.')
  }

  deleteManyByQuestionId(questionId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
