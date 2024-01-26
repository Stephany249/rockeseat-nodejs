import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import {
  Pet,
  PetAge,
  PetSize,
  PetEnergyLevel,
  PetIndependenceLevel,
  PetSpaceNeed,
  PetGallery,
  AdoptionRequirements,
} from '@prisma/client'
import { MinimumOneAdoptionRequirementError } from './errors/minimum-one-adoption-requirement-error'
import { MinimumOneImageOfPetError } from './errors/minimum-one-image-of-pet-error'
import { getGeoLocationByCEP } from '@/lib/location'
import { titleize } from '@/utils/titleize'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { PetsGalleryRepository } from '@/repositories/pets-gallery-repository'
import { PetsAdoptionRequirementRepository } from '@/repositories/pets-adoption-requirements-repository'

interface CreatePetUseCaseRequest {
  name: string
  description: string
  age: PetAge
  size: PetSize
  energy: PetEnergyLevel
  independence: PetIndependenceLevel
  space: PetSpaceNeed
  adoptionRequirements: string
  images: File[]
  orgId: string
}

interface CreatePetResponse {
  pet: Pet
  petGallery: PetGallery[]
  adoptionRequirements: AdoptionRequirements[]
}

export class CreatePetUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private petsRepository: PetsRepository,
    private petsGalleryRepository: PetsGalleryRepository,
    private petAdoptionsRequirementRepository: PetsAdoptionRequirementRepository
  ) { }

  async execute({
    name,
    description,
    age,
    size,
    energy,
    independence,
    space,
    adoptionRequirements,
    images,
    orgId,
  }: CreatePetUseCaseRequest): Promise<CreatePetResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    const parsedRequirement = JSON.parse(adoptionRequirements)


    if (parsedRequirement.length <= 0) {
      throw new MinimumOneAdoptionRequirementError()
    }

    if (images.length <= 0) {
      throw new MinimumOneImageOfPetError()
    }

    const photo = images[0].filename

    const { city } = await getGeoLocationByCEP(org.cep)

    const pet = await this.petsRepository.create({
      age,
      city: titleize(city),
      description,
      energy,
      independence,
      name,
      photo: photo!,
      size,
      space,
      orgId: org.id,
    })

    const petGallery = []
    const requirements = []

    for await (const image of images) {
      const gallery = await this.petsGalleryRepository.create({
        image: image.filename!,
        petId: pet.id,
      })

      petGallery.push(gallery)
    }

    for await (const requirement of parsedRequirement) {
      const adoptionRequirement = await this.petAdoptionsRequirementRepository.create({
        petId: pet.id,
        title: requirement.title,
      })

      requirements.push(adoptionRequirement)
    }

    return { pet, petGallery, adoptionRequirements: requirements }
  }
}
