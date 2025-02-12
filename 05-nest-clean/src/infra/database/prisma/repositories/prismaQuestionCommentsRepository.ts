import { Injectable } from '@nestjs/common'

import { PrismaService } from '../prisma.service'
import { PaginationParams } from '@/core/repositories/paginationParams'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/questionCommentsRepository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/questionComment'

@Injectable()
export class PrismaQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string): Promise<QuestionComment | null> {
    throw new Error('Method not implemented.')
  }

  findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]> {
    throw new Error('Method not implemented.')
  }

  create(QuestionComment: QuestionComment): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(QuestionComment: QuestionComment): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
