import { FetchQuestionCommentsUseCase } from './fetch-question-comments'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { makeQuestionComment } from 'test/factories/make-question-comment'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: FetchQuestionCommentsUseCase

describe('Fetch Question Comment', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository()
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to fetch question comment', async () => {
    await inMemoryQuestionCommentsRepository.create(makeQuestionComment({ questionId: new UniqueEntityID('any_question') }))
    await inMemoryQuestionCommentsRepository.create(makeQuestionComment({ questionId: new UniqueEntityID('any_question') }))
    await inMemoryQuestionCommentsRepository.create(makeQuestionComment({ questionId: new UniqueEntityID('any_question') }))


    const { questionComments } = await sut.execute({
      questionId: 'any_question',
      page: 1
    })

    expect(questionComments).toHaveLength(3)
  })


  it('should be able to fetch paginated question comment', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(makeQuestionComment({ questionId: new UniqueEntityID('any_question') }))
    }

    const { questionComments } = await sut.execute({
      questionId: 'any_question',
      page: 2
    })

    expect(questionComments).toHaveLength(2)
  })
})
