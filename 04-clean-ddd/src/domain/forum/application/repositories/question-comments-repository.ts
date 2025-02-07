import { QuestionComment } from '../../enterprise/entities/question-comment'

export interface QuestionCommentsRepository {
  create(QuestionComment: QuestionComment): Promise<void>
}
