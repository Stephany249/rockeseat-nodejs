import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository"
import { ListPetsUseCase } from "../list-pets"

export function makeListPetsUseCase() {
  const prismaUsersRepository = new PrismaPetsRepository()
  const listPetsUseCase = new ListPetsUseCase(prismaUsersRepository)

  return listPetsUseCase
}
