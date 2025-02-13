import { QuestionComment } from '../../enterprise/entities/questionComment'
import { PaginationParams } from '@/core/repositories/paginationParams'

export abstract class QuestionCommentsRepository {
  abstract findById(id: string): Promise<QuestionComment | null>
  abstract findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]>

  abstract create(questionComment: QuestionComment): Promise<void>
  abstract delete(questionComment: QuestionComment): Promise<void>
}
