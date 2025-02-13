import { Module } from '@nestjs/common'

import { PrismaService } from './prisma/prisma.service'
import { PrismaAnswerAttachmentsRepository } from './prisma/repositories/prismaAnswerAttachmentsRepository'
import { PrismaAnswerCommentsRepository } from './prisma/repositories/prismaAnswerCommentsRepository'
import { PrismaAnswersRepository } from './prisma/repositories/prismaAnswersRepository'
import { PrismaQuestionAttachmentRepository } from './prisma/repositories/prismaQuestionAttachmentsRepository'
import { PrismaQuestionCommentsRepository } from './prisma/repositories/prismaQuestionCommentsRepository'
import { PrismaQuestionsRepository } from './prisma/repositories/prismaQuestionsRepository'
import { PrismaStudentsRepository } from './prisma/repositories/prismaStudentsRepository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questionsRepository'
import { StudentsRepository } from '@/domain/forum/application/repositories/studentsRepository'

@Module({
  providers: [
    PrismaService,
    PrismaAnswersRepository,
    PrismaAnswerAttachmentsRepository,
    PrismaAnswerCommentsRepository,
    PrismaQuestionAttachmentRepository,
    PrismaQuestionCommentsRepository,
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },
    {
      provide: StudentsRepository,
      useClass: PrismaStudentsRepository,
    },
  ],
  exports: [
    PrismaService,
    PrismaAnswersRepository,
    PrismaAnswerAttachmentsRepository,
    PrismaAnswerCommentsRepository,
    PrismaQuestionAttachmentRepository,
    PrismaQuestionCommentsRepository,
    QuestionsRepository,
    StudentsRepository,
  ],
})
export class DatabaseModule {}
