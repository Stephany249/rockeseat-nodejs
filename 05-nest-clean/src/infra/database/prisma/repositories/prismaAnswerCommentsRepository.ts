import { Injectable } from '@nestjs/common'

import { PrismaService } from '../prisma.service'
import { PaginationParams } from '@/core/repositories/paginationParams'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answerCommentsRepository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answerComment'

@Injectable()
export class PrismaAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string): Promise<AnswerComment | null> {
    throw new Error('Method not implemented.')
  }

  findManyByAnswerId(
    answerId: string,
    params: PaginationParams,
  ): Promise<AnswerComment[]> {
    throw new Error('Method not implemented.')
  }

  create(answerComment: AnswerComment): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(answerComment: AnswerComment): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
