import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'

import { ZodValidationPipe } from '../pipes/zodValidationPipe'
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticateStudent'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/sessions')
export class AuthenticateController {
  constructor(private authenticateStudent: AuthenticateStudentUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body

    const result = await this.authenticateStudent.execute({ email, password })

    if (result.isLeft()) {
      throw new UnauthorizedException('Invalid credentials.')
    }

    const { accessToken } = result.value

    return { accessToken }
  }
}
