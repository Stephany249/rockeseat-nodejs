import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { DeleteQuestionCommentUseCase } from './delete-question-comment'
import { makeQuestionComment } from 'test/factories/make-question-comment'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: DeleteQuestionCommentUseCase

describe('Delete Question Comment', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository()
    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to delete a question comment', async () => {
    const newQuestion = makeQuestionComment({
      authorId: new UniqueEntityID('any_id'),
    }, new UniqueEntityID('question-1'))

    await inMemoryQuestionCommentsRepository.create(newQuestion)

    await sut.execute({
      authorId: 'any_id',
      questionId: 'question-1',
    })

    expect(inMemoryQuestionCommentsRepository.questionComments).toHaveLength(0)
  })


  it('should not be able to delete another user question comment ', async () => {
    const newQuestion = makeQuestionComment({
      authorId: new UniqueEntityID('any_id'),
    }, new UniqueEntityID('question-1'))

    await inMemoryQuestionCommentsRepository.create(newQuestion)


    expect(() => {
      return sut.execute({
        authorId: 'any',
        questionId: 'question-1',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
