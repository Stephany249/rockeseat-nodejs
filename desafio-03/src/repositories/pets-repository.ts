import { QueryParamsProps } from '@/http/controllers/pets/list-pets'
import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(petId: string): Promise<Pet | null>
  findMany(city: string, query: QueryParamsProps): Promise<Pet[]>
}
