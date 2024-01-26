import { PetGallery, Prisma } from "@prisma/client";
import { PetsGalleryRepository } from "../pets-gallery-repository";
import { randomUUID } from "crypto";

export class InMemoryPetsGalleryRepository implements PetsGalleryRepository {
  public items: PetGallery[] = []

  async create(data: Prisma.PetGalleryUncheckedCreateInput) {
    const petGallery = {
      id: randomUUID(),
      image: data.image,
      petId: data.petId
    }

    this.items.push(petGallery)

    return petGallery
  }
}