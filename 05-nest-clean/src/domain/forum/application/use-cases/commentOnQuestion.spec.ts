import { makeQuestion } from 'test/factories/makeQuestion'

import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/inMemoryQuestionAttachmentsRepository'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/inMemoryQuestionCommentsRepository'
import { InMemoryQuestionsRepository } from 'test/repositories/inMemoryQuestionsRepository'
import { CommentOnQuestionUseCase } from './commentOnQuestion'

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: CommentOnQuestionUseCase

describe('Comment on Question', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()

    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()

    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionCommentsRepository,
      inMemoryQuestionsRepository,
    )
  })

  it('should be able to comment on question', async () => {
    const newQuestion = makeQuestion({})

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      authorId: newQuestion.authorId.toValue(),
      questionId: newQuestion.id.toValue(),
      content: 'any_content',
    })

    expect(
      inMemoryQuestionCommentsRepository.questionComments[0].content,
    ).toEqual('any_content')
  })
})
