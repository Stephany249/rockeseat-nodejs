import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { z } from 'zod'

import { ZodValidationPipe } from '../pipes/zodValidationPipe'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/createQuestion'
import { CurrentUser } from '@/infra/auth/currentUserDecorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
  attachments: z.array(z.string().uuid()),
})

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema)

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller('/questions')
export class CreateQuestionController {
  constructor(private createQuestion: CreateQuestionUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateQuestionBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, content, attachments } = body
    const userId = user.sub

    const result = await this.createQuestion.execute({
      title,
      content,
      authorId: userId,
      attachmentsIds: attachments,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
