import { QuestionCommentsRepository } from '../repositories/questionCommentsRepository'
import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/notAllowedError'
import { ResourceNotFoundError } from '@/core/errors/resourceNotFoundError'

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionId: string
}

type DeleteQuestionCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment =
      await this.questionCommentsRepository.findById(questionId)

    if (!questionComment) {
      return left(new ResourceNotFoundError())
    }

    if (questionComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.questionCommentsRepository.delete(questionComment)

    return right(null)
  }
}
