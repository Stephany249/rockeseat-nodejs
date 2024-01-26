import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { PetsRepository } from '@/repositories/pets-repository'

interface GetPetUseCaseRequest {
  petId: string
}

interface GetPetUseCaseResponse {
  pet: Pet
}

export class GetPetUseCase {
  constructor(private petsRepository: PetsRepository) { }

  async execute({
    petId,
  }: GetPetUseCaseRequest): Promise<GetPetUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    const petGallery = pet.PetGallery.map((gallery) => ({
      ...gallery,
      image: undefined,
      image_url: `${process.env.APP_URL}/images/${gallery.image}`,
    }))

    return {
      pet: {
        ...pet,
        photo: `${process.env.APP_URL}/images/${pet?.photo}`,
        PetGallery: petGallery
      }
    }
  }
}
