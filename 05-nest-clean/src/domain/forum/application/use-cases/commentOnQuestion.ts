import { QuestionComment } from '../../enterprise/entities/questionComment'
import { QuestionCommentsRepository } from '../repositories/questionCommentsRepository'
import { QuestionsRepository } from '../repositories/questionsRepository'
import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/uniqueEntityId'
import { ResourceNotFoundError } from '@/core/errors/resourceNotFoundError'

interface CommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

type CommentOnQuestionUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    questionComment: QuestionComment
  }
>

export class CommentOnQuestionUseCase {
  constructor(
    private questionCommentsRepository: QuestionCommentsRepository,
    private questionsRepository: QuestionsRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      content,
      questionId: new UniqueEntityID(questionId),
    })

    await this.questionCommentsRepository.create(questionComment)

    return right({ questionComment })
  }
}
