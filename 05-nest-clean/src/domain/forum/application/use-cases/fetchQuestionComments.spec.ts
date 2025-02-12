import { makeQuestionComment } from 'test/factories/makeQuestionComment'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/inMemoryQuestionCommentsRepository'
import { FetchQuestionCommentsUseCase } from './fetchQuestionComments'
import { UniqueEntityID } from '@/core/entities/uniqueEntityId'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: FetchQuestionCommentsUseCase

describe('Fetch Question Comment', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to fetch question comment', async () => {
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityID('any_question') }),
    )
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityID('any_question') }),
    )
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityID('any_question') }),
    )

    const result = await sut.execute({
      questionId: 'any_question',
      page: 1,
    })

    expect(result.value?.questionComments).toHaveLength(3)
  })

  it('should be able to fetch paginated question comment', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({ questionId: new UniqueEntityID('any_question') }),
      )
    }

    const result = await sut.execute({
      questionId: 'any_question',
      page: 2,
    })

    expect(result.value?.questionComments).toHaveLength(2)
  })
})
