import { Injectable } from '@nestjs/common'

import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answerAttachmentsRepository'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answerAttachment'

@Injectable()
export class PrismaAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    throw new Error('Method not implemented.')
  }

  deleteManyByAnswerId(answerId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
