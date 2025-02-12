import { AnswerCommentsRepository } from '../repositories/answerCommentsRepository'
import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/notAllowedError'
import { ResourceNotFoundError } from '@/core/errors/resourceNotFoundError'

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerId: string
}

type DeleteAnswerCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment = await this.answerCommentsRepository.findById(answerId)

    if (!answerComment) {
      return left(new ResourceNotFoundError())
    }

    if (answerComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.answerCommentsRepository.delete(answerComment)

    return right(null)
  }
}
