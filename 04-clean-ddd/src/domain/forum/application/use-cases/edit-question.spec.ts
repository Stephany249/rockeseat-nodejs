import { EditQuestionUseCase } from './edit-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('any_id'),
    }, new UniqueEntityID('question-1'))

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      authorId: 'any_id',
      questionId: newQuestion.id.toValue(),
      title: 'new title',
      content: 'new content',
    })

    expect(inMemoryQuestionsRepository.questions[0]).toMatchObject({
      title: 'new title',
      content: 'new content',
    })
  })


  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('any_id'),
    }, new UniqueEntityID('question-1'))

    await inMemoryQuestionsRepository.create(newQuestion)


    expect(() => {
      return sut.execute({
        authorId: 'any',
        questionId: newQuestion.id.toValue(),
        title: 'new title',
        content: 'new content',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
