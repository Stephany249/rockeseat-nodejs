import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'

test('create an answer', () => {
  const answerQuestion = new AnswerQuestionUseCase()

  const answer = answerQuestion.execute({
    instructorId: 'any_id',
    questionId: 'any_id',
    content: 'Nova resposta'
  })

  expect(answer.content).toBe('Nova resposta')
})