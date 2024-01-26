import { ResourceNotFoundError } from "@/usecase/errors/resource-not-found-error";
import { makeListPetsUseCase } from "@/usecase/factories/make-list-pets-use-case";
import { parseQueryParams } from "@/utils/parseQueryParmas";
import { PetAgeProps, PetEnergyProps, PetIndependenceProps, PetSizeProps } from "@/utils/pet-filter-types";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export interface QueryParamsProps {
  age?: PetAgeProps
  energy?: PetEnergyProps
  independence?: PetIndependenceProps
  size?: PetSizeProps
}

export async function listPets(request: FastifyRequest, reply: FastifyReply) {
  const requestParamsSchema = z.object({
    city: z.string(),
  })
  const { city } = requestParamsSchema.parse(request.params)

  const query = parseQueryParams<QueryParamsProps>(request.query)

  try {
    const listPetsUseCase = makeListPetsUseCase()

    const { pets } = await listPetsUseCase.execute({
      city,
      query
    })

    return reply.status(200).send({ pets })

  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}