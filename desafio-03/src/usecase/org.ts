import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrgEmailAlreadyExistsError } from './errors/org-email-already-exists-error'
import { PasswordsDoNotMatchError } from './errors/password-do-not-match-error'

interface OrgUseCaseRequest {
  name: string
  email: string
  cep: string
  address: string
  whatsapp: string
  password: string
  passwordConfirm: string
}

interface OrgUseCaseResponse {
  org: Org
}

export class OrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    cep,
    address,
    whatsapp,
    password,
    passwordConfirm,
  }: OrgUseCaseRequest): Promise<OrgUseCaseResponse> {
    const orgAlreadyExists = await this.orgsRepository.findByEmail(email)

    if (orgAlreadyExists) {
      throw new OrgEmailAlreadyExistsError()
    }

    if (password !== passwordConfirm) {
      throw new PasswordsDoNotMatchError()
    }

    const passwordHash = await hash(password, 6)

    const org = await this.orgsRepository.create({
      name,
      email,
      cep,
      address,
      password: passwordHash,
      whatsapp,
    })

    return { org }
  }
}
