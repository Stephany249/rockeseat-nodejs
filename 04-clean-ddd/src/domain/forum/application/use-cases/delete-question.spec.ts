import { DeleteQuestionUseCase } from './delete-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('Delete Question By Id', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to delete a question', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('any_id'),
    }, new UniqueEntityID('question-1'))

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      authorId: 'any_id',
      questionId: 'question-1',
    })

    expect(inMemoryQuestionsRepository.questions).toHaveLength(0)
  })


  it('should not be able to delete a question from another user', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('any_id'),
    }, new UniqueEntityID('question-1'))

    await inMemoryQuestionsRepository.create(newQuestion)


    expect(() => {
      return sut.execute({
        authorId: 'any',
        questionId: 'question-1',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
