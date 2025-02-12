import { PaginationParams } from '@/core/repositories/paginationParams'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/questionCommentsRepository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/questionComment'

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public questionComments: QuestionComment[] = []

  async findById(id: string) {
    const questionComment = this.questionComments.find(
      (comment) => comment.id.toString() === id,
    )

    if (!questionComment) {
      return null
    }

    return questionComment
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<QuestionComment[]> {
    const questionComments = this.questionComments
      .filter((comment) => comment.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return questionComments
  }

  async create(questionComment: QuestionComment) {
    this.questionComments.push(questionComment)
  }

  async delete(questionComment: QuestionComment) {
    const index = this.questionComments.findIndex(
      (qc) => qc.id === questionComment.id,
    )

    this.questionComments.splice(index, 1)
  }
}
