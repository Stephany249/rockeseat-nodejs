import { Module } from '@nestjs/common'

import { AnswerQuestionController } from './controllers/answerQuestion.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { ChooseQuestionBestAnswerController } from './controllers/chooseQuestionBestAnswer.controller'
import { CreateAccountController } from './controllers/createAccount.controller'
import { CreateQuestionController } from './controllers/createQuestion.controller'
import { DeleteAnswerController } from './controllers/deleteAnswer.controller'
import { DeleteQuestionController } from './controllers/deleteQuestion.controller'
import { EditQuestionController } from './controllers/editQuestion.controller'
import { FetchRecentQuestionsController } from './controllers/fetchRecentQuestions.controller'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { EditAnswerController } from './controllers/editAnswer.controller'
import { FetchQuestionAnswersController } from './controllers/fetchQuestionAnswers.controller'
import { GetQuestionBySlugController } from './controllers/getQuestionBySlug.controller'

import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answerQuestion'
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticateStudent'
import { ChooseQuestionBestAnswerUseCase } from '@/domain/forum/application/use-cases/chooseQuestionBestAnswer'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/createQuestion'
import { DeleteAnswerUseCase } from '@/domain/forum/application/use-cases/deleteAnswer'
import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/deleteQuestion'
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/editAnswer'
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/editQuestion'
import { FetchQuestionAnswersUseCase } from '@/domain/forum/application/use-cases/fetchQuestionAnswers'
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
    DeleteAnswerController,
    FetchQuestionAnswersController,
    ChooseQuestionBestAnswerController,
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
    DeleteAnswerUseCase,
    FetchQuestionAnswersUseCase,
    ChooseQuestionBestAnswerUseCase,
  ],
})
export class HttpModule {}
