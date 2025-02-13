import { Injectable } from '@nestjs/common'

import { PrismaQuestionAttachmentMapper } from '../mappers/prismaQuestionAttachmentMapper'
import { PrismaService } from '../prisma.service'
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/questionAttachmentsRepository'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/questionAttachment'

@Injectable()
export class PrismaQuestionAttachmentRepository
  implements QuestionAttachmentsRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachment[]> {
    const questionAttachments = await this.prisma.attachment.findMany({
      where: { questionId },
    })

    return questionAttachments.map(PrismaQuestionAttachmentMapper.toDomain)
  }

  async deleteManyByQuestionId(questionId: string): Promise<void> {
    await this.prisma.attachment.deleteMany({
      where: { questionId },
    })
  }
}
