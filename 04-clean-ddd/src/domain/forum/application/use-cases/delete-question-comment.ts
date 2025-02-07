import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionId: string
}

interface DeleteQuestionCommentUseCaseResponse { }

export class DeleteQuestionCommentUseCase {
  constructor(
    private questionCommentsRepository: QuestionCommentsRepository,
  ) { }

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment = await this.questionCommentsRepository.findById(questionId)

    if (!questionComment) {
      throw new Error('Question not found.')
    }

    if (questionComment.authorId.toString() !== authorId) {
      throw new Error('Not allowed.')
    }


    await this.questionCommentsRepository.delete(questionComment)

    return {}
  }
}
