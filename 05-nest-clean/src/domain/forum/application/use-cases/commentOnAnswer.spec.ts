import { makeAnswer } from 'test/factories/makeAnswer'

import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/inMemoryAnswerAttachmentsRepository'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/inMemoryAnswerCommentsRepository'
import { InMemoryAnswersRepository } from 'test/repositories/inMemoryAnswersRepository'
import { CommentOnAnswerUseCase } from './commentOnAnswer'

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
