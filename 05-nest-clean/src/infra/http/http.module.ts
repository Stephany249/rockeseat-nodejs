import { Module } from '@nestjs/common'

import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/createAccount.controller'
import { CreateQuestionController } from './controllers/createQuestion.controller'
import { FetchRecentQuestionsController } from './controllers/fetchRecentQuestions.controller'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { GetQuestionBySlugController } from './controllers/getQuestionBySlug.controller'
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticateStudent'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/createQuestion'
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
  ],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase,
    AuthenticateStudentUseCase,
    RegisterStudentUseCase,
    GetQuestionBySlugUseCase,
  ],
})
export class HttpModule {}
