import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaAnswerAttachmentsRepository } from './prisma/repositories/prismaAnswerAttachmentsRepository'
import { PrismaAnswerCommentsRepository } from './prisma/repositories/prismaAnswerCommentsRepository'
import { PrismaAnswersRepository } from './prisma/repositories/prismaAnswersRepository'
import { PrismaQuestionAttachmentRepository } from './prisma/repositories/prismaQuestionAttachmentsRepository'
import { PrismaQuestionCommentsRepository } from './prisma/repositories/prismaQuestionCommentsRepository'
import { PrismaQuestionsRepository } from './prisma/repositories/prismaQuestionsRepository'

@Module({
  providers: [
    PrismaService,
    PrismaAnswersRepository,
    PrismaAnswerAttachmentsRepository,
    PrismaAnswerCommentsRepository,
    PrismaQuestionAttachmentRepository,
    PrismaQuestionCommentsRepository,
    PrismaQuestionsRepository,
  ],
  exports: [
    PrismaService,
    PrismaAnswersRepository,
    PrismaAnswerAttachmentsRepository,
    PrismaAnswerCommentsRepository,
    PrismaQuestionAttachmentRepository,
    PrismaQuestionCommentsRepository,
    PrismaQuestionsRepository,
  ],
})
export class DatabaseModule {}
