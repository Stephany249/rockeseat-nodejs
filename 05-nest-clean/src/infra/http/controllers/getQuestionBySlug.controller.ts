import { BadRequestException, Controller, Get, Param } from '@nestjs/common'

import { QuestionPresenter } from '../presenters/questionPresenter'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/getQuestionBySlug'

@Controller('/questions/:slug')
export class GetQuestionBySlugController {
  constructor(private getQuestionBySlug: GetQuestionBySlugUseCase) {}

  @Get()
  async handle(@Param('slug') slug: string) {
    const result = await this.getQuestionBySlug.execute({
      slug,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const question = result.value.question

    return { question: QuestionPresenter.toHTTP(question) }
  }
}
