import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answersRepository'
import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/notAllowedError'
import { ResourceNotFoundError } from '@/core/errors/resourceNotFoundError'

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer
  }
>

export class EditAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }
    answer.content = content

    await this.answersRepository.save(answer)

    return right({
      answer,
    })
  }
}
