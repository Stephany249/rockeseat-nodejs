import { AdoptionRequirements, Prisma } from "@prisma/client";
import { PetsAdoptionRequirementRepository } from "../pets-adoption-requirements-repository";
import { randomUUID } from "crypto";

export class InMemoryPetsAdoptionRequirementRepository implements PetsAdoptionRequirementRepository {
  public items: AdoptionRequirements[] = []


  async create(data: Prisma.AdoptionRequirementsUncheckedCreateInput) {
    const adoptionRequirement = {
      id: randomUUID(),
      title: data.title,
      petId: data.petId,
    }

    this.items.push(adoptionRequirement)

    return adoptionRequirement
  }
}
