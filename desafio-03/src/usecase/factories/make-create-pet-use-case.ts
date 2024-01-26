import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { CreatePetUseCase } from '../create-pet'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PrismaPetsGalleryRepository } from '@/repositories/prisma/prisma-pets-gallery-repository'
import { PrismaPetsAdoptionRequirementRepository } from '@/repositories/prisma/prisma-pets-adoption-requirements-repositoey'

export function makeCreatePetUseCase() {
  const primaOrgsRepository = new PrismaOrgsRepository()
  const primaPetsRepository = new PrismaPetsRepository()
  const prismaPetsGalleryRepository = new PrismaPetsGalleryRepository()
  const prismaPetsAdoptionRequirementRepository = new PrismaPetsAdoptionRequirementRepository()
  const createPetUseCase = new CreatePetUseCase(
    primaOrgsRepository,
    primaPetsRepository,
    prismaPetsGalleryRepository,
    prismaPetsAdoptionRequirementRepository
  )

  return createPetUseCase
}
