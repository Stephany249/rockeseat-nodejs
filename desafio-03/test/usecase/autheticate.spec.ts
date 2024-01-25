import { beforeEach, describe, it, expect } from 'vitest'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { AuthenticateUseCase } from '@/usecase/authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '@/usecase/errors/invalid-credentials-error'

let orgsRepository: InMemoryOrgsRepository
let authenticateUseCase: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    authenticateUseCase = new AuthenticateUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {
    await orgsRepository.create({
      name: 'Teste 1',
      email: 'teste1@gmail.com',
      cep: '91215095',
      address: 'R. Luiz Fontoura Junior',
      whatsapp: '11999999999',
      password: await hash('123456', 6),
    })

    const { org } = await authenticateUseCase.execute({
      email: 'teste1@gmail.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(
      authenticateUseCase.execute({
        email: 'teste1@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await orgsRepository.create({
      name: 'Teste 1',
      email: 'teste1@gmail.com',
      cep: '91215095',
      address: 'R. Luiz Fontoura Junior',
      whatsapp: '11999999999',
      password: await hash('123456', 6),
    })

    await expect(
      authenticateUseCase.execute({
        email: 'teste1@gmail.com',
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
