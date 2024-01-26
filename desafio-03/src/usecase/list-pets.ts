import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { PetsRepository } from '@/repositories/pets-repository'
import { QueryParamsProps } from '@/http/controllers/pets/list-pets'

interface ListPetsUseCaseRequest {
  city: string
  query: QueryParamsProps
}

interface ListPetsUseCaseResponse {
  pets: Pet[]
}

export class ListPetsUseCase {
  constructor(private petsRepository: PetsRepository) { }

  async execute({
    city,
    query
  }: ListPetsUseCaseRequest): Promise<ListPetsUseCaseResponse> {

    const pets = await this.petsRepository.findMany(
      city,
      query,
    )

    if (pets.length === 0) {
      throw new ResourceNotFoundError()
    }


    return {
      pets: pets.map((pet) => ({
        ...pet,
        photo: `${process.env.APP_URL}/images/${pet.photo}`,
      }))
    }
  }
}
