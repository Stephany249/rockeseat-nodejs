import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from '@/usecase/authenticate'
import { InvalidCredentialsError } from '@/usecase/errors/invalid-credentials-error'
import { hash } from 'bcryptjs'
import { describe, it, expect, beforeEach } from 'vitest'

let usersRepository: InMemoryUsersRepository
let authenticateUseCase: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    authenticateUseCase = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate ', async () => {
    await usersRepository.create({
      name: 'Jane Doe',
      email: 'janeDoe@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await authenticateUseCase.execute({
      email: 'janeDoe@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email ', async () => {
    await expect(() =>
      authenticateUseCase.execute({
        email: 'janeDoe@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password ', async () => {
    await usersRepository.create({
      name: 'Jane Doe',
      email: 'janeDoe@gmail.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      authenticateUseCase.execute({
        email: 'janeDoe@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
