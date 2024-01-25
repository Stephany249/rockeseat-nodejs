import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgEmailAlreadyExistsError } from '@/usecase/errors/org-email-already-exists-error'
import { PasswordsDoNotMatchError } from '@/usecase/errors/password-do-not-match-error'
import { OrgUseCase } from '@/usecase/org'
import { beforeEach, describe, it, expect } from 'vitest'

let orgsRepository: InMemoryOrgsRepository
let orgUseCase: OrgUseCase

describe('Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    orgUseCase = new OrgUseCase(orgsRepository)
  })

  it('should be able to create org', async () => {
    const { org } = await orgUseCase.execute({
      name: 'Org 1',
      email: 'org1@gmail.com',
      cep: '12123125',
      address: 'R. dos Patos',
      whatsapp: '11999999999',
      password: '123456',
      passwordConfirm: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to create org with same email twice', async () => {
    const email = 'org1@gmail.com'

    await orgUseCase.execute({
      name: 'Org 1',
      email,
      cep: '12123125',
      address: 'R. dos Patos',
      whatsapp: '11999999999',
      password: '123456',
      passwordConfirm: '123456',
    })

    await expect(() =>
      orgUseCase.execute({
        name: 'Org 1',
        email,
        cep: '12123125',
        address: 'R. dos Patos',
        whatsapp: '11999999999',
        password: '123456',
        passwordConfirm: '123456',
      }),
    ).rejects.toBeInstanceOf(OrgEmailAlreadyExistsError)
  })

  it('should not be able to create org with different passwords', async () => {
    await expect(() =>
      orgUseCase.execute({
        name: 'Org 1',
        email: 'org1@gmail.com',
        cep: '12123125',
        address: 'R. dos Patos',
        whatsapp: '11999999999',
        password: '123456',
        passwordConfirm: '123458',
      }),
    ).rejects.toBeInstanceOf(PasswordsDoNotMatchError)
  })
})
