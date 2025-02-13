import { Injectable } from '@nestjs/common'
import { Answer } from '../../enterprise/entities/answer'
import { AnswerAttachment } from '../../enterprise/entities/answerAttachment'
import { AnswerAttachmentList } from '../../enterprise/entities/answerAttachmentList'
import { AnswerAttachmentsRepository } from '../repositories/answerAttachmentsRepository'
import { AnswersRepository } from '../repositories/answersRepository'
import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/uniqueEntityId'
import { NotAllowedError } from '@/core/errors/notAllowedError'
import { ResourceNotFoundError } from '@/core/errors/resourceNotFoundError'

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
  attachmentsIds: string[]
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer
  }
>

@Injectable()
export class EditAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
    attachmentsIds,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    const currentAnswerAttachments =
      await this.answerAttachmentsRepository.findManyByAnswerId(answerId)

    const answerAttachmentList = new AnswerAttachmentList(
      currentAnswerAttachments,
    )

    const answerAttachments = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        answerId: answer.id,
      })
    })

    answerAttachmentList.update(answerAttachments)

    answer.content = content

    await this.answersRepository.save(answer)

    return right({
      answer,
    })
  }
}
