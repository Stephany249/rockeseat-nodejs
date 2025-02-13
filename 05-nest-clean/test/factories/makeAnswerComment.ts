/* eslint-disable prettier/prettier */
import { faker } from '@faker-js/faker'

import { Injectable } from '@nestjs/common'
import { UniqueEntityID } from '@/core/entities/uniqueEntityId'
import { AnswerComment, AnswerCommentProps } from '@/domain/forum/enterprise/entities/answerComment'
import { PrismaAnswerCommentMapper } from '@/infra/database/prisma/mappers/prismaAnswerCommentMapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

export function makeAnswerComment(
  override: Partial<AnswerCommentProps> = {},
  id?: UniqueEntityID,
) {
  const answer = AnswerComment.create(
    {
      authorId: new UniqueEntityID(),
      answerId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return answer
}

@Injectable()
export class AnswerCommentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaAnswerComment(
    data: Partial<AnswerCommentProps> = {},
  ): Promise<AnswerComment> {
    const answerComment = makeAnswerComment(data)

    await this.prisma.comment.create({
      data: PrismaAnswerCommentMapper.toPrisma(answerComment),
    })
    
    return answerComment
  }
}
