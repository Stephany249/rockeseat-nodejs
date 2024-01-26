import { AdoptionRequirements, Prisma } from '@prisma/client'

export interface PetsAdoptionRequirementRepository {
  create(data: Prisma.AdoptionRequirementsUncheckedCreateInput): Promise<AdoptionRequirements>
}
