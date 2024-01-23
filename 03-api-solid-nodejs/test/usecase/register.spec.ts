import { describe, it, expect, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'
import { RegisterUseCase } from '@/usecase/register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '@/usecase/errors/user-already-exists'

let usersRepository: InMemoryUsersRepository
let registerUseCase: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    registerUseCase = new RegisterUseCase(usersRepository)
  })

  it('should hash user password upon registration ', async () => {
    const { user } = await registerUseCase.execute({
      name: 'Jane Doe',
      email: 'janeDoe@gmail.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'janeDoe@gmail.com'

    await registerUseCase.execute({
      name: 'Jane Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      registerUseCase.execute({
        name: 'Jane Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should be able to register ', async () => {
    const { user } = await registerUseCase.execute({
      name: 'Jane Doe',
      email: 'janeDoe@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
