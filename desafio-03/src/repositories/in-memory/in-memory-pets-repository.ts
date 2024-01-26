import { Pet, Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { randomUUID } from "crypto";

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []


  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      age: data.age,
      size: data.size,
      energy: data.energy,
      independence: data.independence,
      space: data.space,
      city: data.city,
      photo: data.photo,
      orgId: data.orgId
    }

    this.items.push(pet)

    return pet
  }

  async findById(petId: string) {
    return this.items[0]
  }
}