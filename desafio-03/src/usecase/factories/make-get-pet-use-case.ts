import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository"
import { GetPetUseCase } from "../get-pet"

export function makeGetPetUseCase() {
  const prismaUsersRepository = new PrismaPetsRepository()
  const getPetUseCase = new GetPetUseCase(prismaUsersRepository)

  return getPetUseCase
}
