import { Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'
import { QueryParamsProps } from '@/http/controllers/pets/list-pets'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({ data })

    return pet
  }

  async findById(petId: string) {
    const pet = await prisma.pet.findUnique({ where: { id: petId }, include: { org: true, PetGallery: true, AdoptionRequirements: true } })

    return pet
  }

  async findMany(city: string, query: QueryParamsProps) {
    const pets = await prisma.pet.findMany({
      where: {
        city,
        ...query,
      },
    })

    return pets
  }
}
