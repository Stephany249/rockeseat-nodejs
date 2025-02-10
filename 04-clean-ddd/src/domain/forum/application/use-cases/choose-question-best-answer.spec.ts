import { makeQuestion } from 'test/factories/make-question'
import { makeAnswer } from 'test/factories/make-answer'

import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Choose Question Best Answer', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()

    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )

    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswersRepository,
    )
  })

  it('should be able to choose the question best answer', async () => {
    const newQuestion = makeQuestion({})

    const newAnswer = makeAnswer({
      questionId: newQuestion.id,
    })

    await inMemoryQuestionsRepository.create(newQuestion)
    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      authorId: newQuestion.authorId.toValue(),
      answerId: newAnswer.id.toValue(),
    })

    expect(inMemoryQuestionsRepository.questions[0].bestAnswerId).toEqual(
      newAnswer.id,
    )
  })

  it('should not be able to choose another user question best answer', async () => {
    const newQuestion = makeQuestion({})

    const newAnswer = makeAnswer({
      questionId: newQuestion.id,
    })

    await inMemoryQuestionsRepository.create(newQuestion)
    await inMemoryAnswersRepository.create(newAnswer)

    const result = await sut.execute({
      authorId: 'any_id',
      answerId: newAnswer.id.toValue(),
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
