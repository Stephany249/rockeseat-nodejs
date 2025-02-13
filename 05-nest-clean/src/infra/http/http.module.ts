import { Module } from '@nestjs/common'

import { AnswerQuestionController } from './controllers/answerQuestion.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { ChooseQuestionBestAnswerController } from './controllers/chooseQuestionBestAnswer.controller'
import { CommentOnAnswerController } from './controllers/commentOnAnswer.controller'
import { CommentOnQuestionController } from './controllers/commentOnQuestion.controller'
import { CreateAccountController } from './controllers/createAccount.controller'
import { CreateQuestionController } from './controllers/createQuestion.controller'
import { DeleteAnswerController } from './controllers/deleteAnswer.controller'
import { DeleteAnswerCommentController } from './controllers/deleteAnswerComment.controller'
import { DeleteQuestionController } from './controllers/deleteQuestion.controller'
import { EditQuestionController } from './controllers/editQuestion.controller'
import { FetchRecentQuestionsController } from './controllers/fetchRecentQuestions.controller'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { DeleteQuestionCommentController } from './controllers/deleteQuestionComment.controller'
import { EditAnswerController } from './controllers/editAnswer.controller'
import { FetchQuestionAnswersController } from './controllers/fetchQuestionAnswers.controller'
import { FetchQuestionCommentsController } from './controllers/fetchQuestionComments.controller'
import { GetQuestionBySlugController } from './controllers/getQuestionBySlug.controller'

import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answerQuestion'
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticateStudent'
import { ChooseQuestionBestAnswerUseCase } from '@/domain/forum/application/use-cases/chooseQuestionBestAnswer'
import { CommentOnAnswerUseCase } from '@/domain/forum/application/use-cases/commentOnAnswer'
import { CommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/commentOnQuestion'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/createQuestion'
import { DeleteAnswerUseCase } from '@/domain/forum/application/use-cases/deleteAnswer'
import { DeleteAnswerCommentUseCase } from '@/domain/forum/application/use-cases/deleteAnswerComment'
import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/deleteQuestion'
import { DeleteQuestionCommentUseCase } from '@/domain/forum/application/use-cases/deleteQuestionComment'
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/editAnswer'
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/editQuestion'
import { FetchQuestionAnswersUseCase } from '@/domain/forum/application/use-cases/fetchQuestionAnswers'
import { FetchQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/fetchQuestionComments'
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
    CommentOnQuestionController,
    DeleteQuestionCommentController,
    CommentOnAnswerController,
    DeleteAnswerCommentController,
    FetchQuestionCommentsController,
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
    CommentOnQuestionUseCase,
    DeleteQuestionCommentUseCase,
    CommentOnAnswerUseCase,
    DeleteAnswerCommentUseCase,
    FetchQuestionCommentsUseCase,
  ],
})
export class HttpModule {}
