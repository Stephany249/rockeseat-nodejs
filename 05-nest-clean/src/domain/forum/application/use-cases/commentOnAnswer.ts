import { Injectable } from '@nestjs/common'
import { AnswerComment } from '../../enterprise/entities/answerComment'
import { AnswerCommentsRepository } from '../repositories/answerCommentsRepository'
import { AnswersRepository } from '../repositories/answersRepository'
import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/uniqueEntityId'
import { ResourceNotFoundError } from '@/core/errors/resourceNotFoundError'

interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

type CommentOnAnswerUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    answerComment: AnswerComment
  }
>

@Injectable()
export class CommentOnAnswerUseCase {
  constructor(
    private answerCommentsRepository: AnswerCommentsRepository,
    private answersRepository: AnswersRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      content,
      answerId: new UniqueEntityID(answerId),
    })

    await this.answerCommentsRepository.create(answerComment)

    return right({ answerComment })
  }
}
