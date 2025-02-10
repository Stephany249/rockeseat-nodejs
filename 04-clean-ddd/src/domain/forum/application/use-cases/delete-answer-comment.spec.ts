import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { DeleteAnswerCommentUseCase } from './delete-answer-comment'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { NotAllowedError } from './errors/not-allowed-error'

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
      answerId: 'answer-1',
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
      answerId: 'answer-1',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
