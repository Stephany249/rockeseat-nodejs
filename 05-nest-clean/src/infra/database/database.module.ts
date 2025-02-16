import { Module } from '@nestjs/common'

import { PrismaService } from './prisma/prisma.service'
import { PrismaAnswerAttachmentsRepository } from './prisma/repositories/prismaAnswerAttachmentsRepository'
import { PrismaAnswerCommentsRepository } from './prisma/repositories/prismaAnswerCommentsRepository'
import { PrismaAnswersRepository } from './prisma/repositories/prismaAnswersRepository'
import { PrismaAttachmentsRepository } from './prisma/repositories/prismaAttachmentsRepository'
import { PrismaNotificationsRepository } from './prisma/repositories/prismaNotificationRepository'
import { PrismaQuestionAttachmentRepository } from './prisma/repositories/prismaQuestionAttachmentsRepository'
import { PrismaQuestionCommentsRepository } from './prisma/repositories/prismaQuestionCommentsRepository'
import { PrismaQuestionsRepository } from './prisma/repositories/prismaQuestionsRepository'
import { PrismaStudentsRepository } from './prisma/repositories/prismaStudentsRepository'
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answerAttachmentsRepository'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answerCommentsRepository'
import { AnswersRepository } from '@/domain/forum/application/repositories/answersRepository'
import { AttachmentsRepository } from '@/domain/forum/application/repositories/attachmentsRepository'
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/questionAttachmentsRepository'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/questionCommentsRepository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questionsRepository'
import { StudentsRepository } from '@/domain/forum/application/repositories/studentsRepository'
import { NotificationsRepository } from '@/domain/notification/application/repositories/notificationsRepository'

@Module({
  providers: [
    PrismaService,
    {
      provide: AnswersRepository,
      useClass: PrismaAnswersRepository,
    },
    {
      provide: AnswerAttachmentsRepository,
      useClass: PrismaAnswerAttachmentsRepository,
    },
    {
      provide: AnswerCommentsRepository,
      useClass: PrismaAnswerCommentsRepository,
    },
    {
      provide: QuestionAttachmentsRepository,
      useClass: PrismaQuestionAttachmentRepository,
    },
    {
      provide: QuestionCommentsRepository,
      useClass: PrismaQuestionCommentsRepository,
    },
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },
    {
      provide: StudentsRepository,
      useClass: PrismaStudentsRepository,
    },
    {
      provide: AttachmentsRepository,
      useClass: PrismaAttachmentsRepository,
    },
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationsRepository,
    },
  ],
  exports: [
    PrismaService,
    AnswersRepository,
    AnswerAttachmentsRepository,
    AnswerCommentsRepository,
    QuestionAttachmentsRepository,
    QuestionCommentsRepository,
    QuestionsRepository,
    StudentsRepository,
    AttachmentsRepository,
    NotificationsRepository,
  ],
})
export class DatabaseModule {}
