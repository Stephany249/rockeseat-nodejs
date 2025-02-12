import { makeAnswer } from 'test/factories/makeAnswer'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/inMemoryAnswerAttachmentsRepository'
import { InMemoryAnswersRepository } from 'test/repositories/inMemoryAnswersRepository'
import { EditAnswerUseCase } from './editAnswer'
import { UniqueEntityID } from '@/core/entities/uniqueEntityId'
import { NotAllowedError } from '@/core/errors/notAllowedError'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()

    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('any_id'),
      },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      authorId: 'any_id',
      answerId: newAnswer.id.toValue(),
      content: 'new content',
    })

    expect(inMemoryAnswersRepository.answers[0]).toMatchObject({
      content: 'new content',
    })
  })

  it('should not be able to edit a answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('any_id'),
      },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    const result = await sut.execute({
      authorId: 'any',
      answerId: newAnswer.id.toValue(),
      content: 'new content',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
