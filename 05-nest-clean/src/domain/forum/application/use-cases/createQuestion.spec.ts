import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/inMemoryQuestionAttachmentsRepository'
import { InMemoryQuestionsRepository } from 'test/repositories/inMemoryQuestionsRepository'
import { CreateQuestionUseCase } from './createQuestion'
import { UniqueEntityID } from '@/core/entities/uniqueEntityId'

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to create an question', async () => {
    const result = await sut.execute({
      authorId: 'any_id',
      title: 'Nova pergunta',
      content: 'Conteúdo da pergunta',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryQuestionsRepository.questions[0]).toEqual(
      result.value?.question,
    )
    expect(
      inMemoryQuestionsRepository.questions[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(
      inMemoryQuestionsRepository.questions[0].attachments.currentItems,
    ).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('2') }),
    ])
  })

  it('should persist attachments when creating a new question', async () => {
    const result = await sut.execute({
      authorId: '1',
      title: 'Nova pergunta',
      content: 'Conteúdo da pergunta',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(
      inMemoryQuestionAttachmentsRepository.questionAttachments,
    ).toHaveLength(2)
    expect(inMemoryQuestionAttachmentsRepository.questionAttachments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          attachmentId: new UniqueEntityID('1'),
        }),
        expect.objectContaining({
          attachmentId: new UniqueEntityID('1'),
        }),
      ]),
    )
  })
})
