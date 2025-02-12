import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { z } from 'zod'

import { ZodValidationPipe } from '../pipes/zodValidationPipe'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/createQuestion'
import { CurrentUser } from '@/infra/auth/currentUserDecorator'
import { JwtAuthGuard } from '@/infra/auth/jwt.auth.guard'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema)

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private createQuestion: CreateQuestionUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateQuestionBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, content } = body
    const userId = user.sub

    await this.createQuestion.execute({
      title,
      content,
      authorId: userId,
      attachmentsIds: [],
    })
  }
}
