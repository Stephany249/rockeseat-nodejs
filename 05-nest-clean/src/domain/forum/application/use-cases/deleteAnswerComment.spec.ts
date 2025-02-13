import { makeAnswerComment } from 'test/factories/makeAnswerComment'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/inMemoryAnswerCommentsRepository'
import { DeleteAnswerCommentUseCase } from './deleteAnswerComment'
import { UniqueEntityID } from '@/core/entities/uniqueEntityId'
import { NotAllowedError } from '@/core/errors/notAllowedError'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: DeleteAnswerCommentUseCase

describe('Delete Answer Comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to delete a answer comment', async () => {
    const newAnswer = makeAnswerComment(
      {
        authorId: new UniqueEntityID('any_id'),
      },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswerCommentsRepository.create(newAnswer)

    await sut.execute({
      authorId: 'any_id',
      answerCommentId: 'answer-1',
    })

    expect(inMemoryAnswerCommentsRepository.answerComments).toHaveLength(0)
  })

  it('should not be able to delete another user answer comment ', async () => {
    const newAnswer = makeAnswerComment(
      {
        authorId: new UniqueEntityID('any_id'),
      },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswerCommentsRepository.create(newAnswer)

    const result = await sut.execute({
      authorId: 'any',
      answerCommentId: 'answer-1',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
