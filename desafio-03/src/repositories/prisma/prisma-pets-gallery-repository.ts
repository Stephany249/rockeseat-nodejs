import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { PetsGalleryRepository } from '../pets-gallery-repository'

export class PrismaPetsGalleryRepository implements PetsGalleryRepository {
  async create(data: Prisma.PetGalleryUncheckedCreateInput) {
    const petGallery = await prisma.petGallery.create({ data })

    return petGallery
  }
}
