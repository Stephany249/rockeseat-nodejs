import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { PetsAdoptionRequirementRepository } from '../pets-adoption-requirements-repository'

export class PrismaPetsAdoptionRequirementRepository implements PetsAdoptionRequirementRepository {
  async create(data: Prisma.AdoptionRequirementsUncheckedCreateInput) {
    const adoptionRequirement = await prisma.adoptionRequirements.create({ data })

    return adoptionRequirement
  }
}
