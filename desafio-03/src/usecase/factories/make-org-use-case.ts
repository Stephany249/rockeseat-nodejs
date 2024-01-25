import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { OrgUseCase } from '../org'

export function makeOrgUseCase() {
  const primaOrgsRepository = new PrismaOrgsRepository()
  const orgUseCase = new OrgUseCase(primaOrgsRepository)

  return orgUseCase
}
