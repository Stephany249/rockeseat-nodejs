import { Injectable } from '@nestjs/common'

import { PrismaService } from '../prisma.service'
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answerAttachmentsRepository'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answerAttachment'

@Injectable()
export class PrismaAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  constructor(private readonly prisma: PrismaService) {}

  findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    throw new Error('Method not implemented.')
  }

  deleteManyByAnswerId(answerId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
