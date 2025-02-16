import { QuestionComment } from '../../enterprise/entities/questionComment'
import { CommentWithAuthor } from '../../enterprise/entities/value-objects/commentWithAuthor'
import { PaginationParams } from '@/core/repositories/paginationParams'

export abstract class QuestionCommentsRepository {
  abstract findById(id: string): Promise<QuestionComment | null>
  abstract findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]>

  abstract findManyByQuestionIdWithAuthor(
    questionId: string,
    params: PaginationParams,
  ): Promise<CommentWithAuthor[]>

  abstract create(questionComment: QuestionComment): Promise<void>
  abstract delete(questionComment: QuestionComment): Promise<void>
}
