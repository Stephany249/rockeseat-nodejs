import { Injectable } from '@nestjs/common'

import { Encrypter } from '../cryptography/encrypter'
import { HashComparer } from '../cryptography/hashComparer'
import { StudentsRepository } from '../repositories/studentsRepository'
import { WrongCredentialsError } from './errors/wrongCredentialsError'
import { Either, left, right } from '@/core/either'

interface AuthenticateStudentUseCaseRequest {
  email: string
  password: string
}

type AuthenticateStudentUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

@Injectable()
export class AuthenticateStudentUseCase {
  constructor(
    private studentsRepository: StudentsRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateStudentUseCaseRequest): Promise<AuthenticateStudentUseCaseResponse> {
    const student = await this.studentsRepository.findByEmail(email)

    if (!student) {
      return left(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      student.password,
    )

    if (!isPasswordValid) {
      throw new WrongCredentialsError()
    }

    const accessToken = await this.encrypter.encrypt({
      sub: student.id.toString(),
    })

    return right({ accessToken })
  }
}
