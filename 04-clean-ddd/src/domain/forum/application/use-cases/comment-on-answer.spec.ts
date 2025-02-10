import { makeAnswer } from 'test/factories/make-answer'

import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { CommentOnAnswerUseCase } from './comment-on-answer'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: CommentOnAnswerUseCase

describe('Comment on Answer', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()

    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()

    sut = new CommentOnAnswerUseCase(
      inMemoryAnswerCommentsRepository,
      inMemoryAnswersRepository,
    )
  })

  it('should be able to comment on answer', async () => {
    const newAnswer = makeAnswer({})

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      authorId: newAnswer.authorId.toValue(),
      answerId: newAnswer.id.toValue(),
      content: 'any_content',
    })

    expect(inMemoryAnswerCommentsRepository.answerComments[0].content).toEqual(
      'any_content',
    )
  })
})
