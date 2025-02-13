import { Module } from '@nestjs/common'

import { AnswerQuestionController } from './controllers/answerQuestion.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/createAccount.controller'
import { CreateQuestionController } from './controllers/createQuestion.controller'
import { DeleteQuestionController } from './controllers/deleteQuestion.controller'
import { EditQuestionController } from './controllers/editQuestion.controller'
import { FetchRecentQuestionsController } from './controllers/fetchRecentQuestions.controller'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { EditAnswerController } from './controllers/editAnswer.controller'
import { GetQuestionBySlugController } from './controllers/getQuestionBySlug.controller'

import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answerQuestion'
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticateStudent'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/createQuestion'
import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/deleteQuestion'
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/editAnswer'
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/editQuestion'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetchRecentQuestions'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/getQuestionBySlug'
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/registerStudent'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
    GetQuestionBySlugController,
    EditQuestionController,
    DeleteQuestionController,
    AnswerQuestionController,
    EditAnswerController,
  ],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase,
    AuthenticateStudentUseCase,
    RegisterStudentUseCase,
    GetQuestionBySlugUseCase,
    EditQuestionUseCase,
    DeleteQuestionUseCase,
    AnswerQuestionUseCase,
    EditAnswerUseCase,
  ],
})
export class HttpModule {}
