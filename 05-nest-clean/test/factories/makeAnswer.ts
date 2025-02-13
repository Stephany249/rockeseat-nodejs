/* eslint-disable prettier/prettier */
import { faker } from '@faker-js/faker'

import { Injectable } from '@nestjs/common'
import { UniqueEntityID } from '@/core/entities/uniqueEntityId'
import {
  Answer,
  AnswerProps,
} from '@/domain/forum/enterprise/entities/answer'
import { PrismaAnswerMapper } from '@/infra/database/prisma/mappers/prismaAnswerMapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

export function makeAnswer(
  override: Partial<AnswerProps> = {},
  id?: UniqueEntityID,
) {
  const answer = Answer.create(
    {
      authorId: new UniqueEntityID(),
      questionId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return answer
}

@Injectable()
export class AnswerFactory {
  constructor(private prisma: PrismaService) {}
  
  async makePrismaAnswer(data: Partial<AnswerProps> = {}): Promise<Answer> {
    const answer = makeAnswer(data)

    await this.prisma.answer.create({
      data: PrismaAnswerMapper.toPrisma(answer),
    })
    
    return answer
  }
}
