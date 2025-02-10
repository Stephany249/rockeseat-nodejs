import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  it('should be able to create an answer', async () => {
    const result = await sut.execute({
      instructorId: 'any_id',
      questionId: 'any_id',
      content: 'Nova resposta',
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryAnswersRepository.answers[0].id).toEqual(
      result.value?.answer.id,
    )
  })
})
