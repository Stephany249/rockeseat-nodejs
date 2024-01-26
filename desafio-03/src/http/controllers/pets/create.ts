import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCreatePetUseCase } from '@/usecase/factories/make-create-pet-use-case'
import { ResourceNotFoundError } from '@/usecase/errors/resource-not-found-error'
import { MinimumOneAdoptionRequirementError } from '@/usecase/errors/minimum-one-adoption-requirement-error'
import { MinimumOneImageOfPetError } from '@/usecase/errors/minimum-one-image-of-pet-error'

declare module 'fastify' {
  export interface FastifyRequest {
    files: File[]
  }
}

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    age: z.enum(['YOUNG', 'TEEN', 'ADULT']),
    size: z.enum(['SMALL', 'MEDIUM', 'BIG']),
    energy: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    independence: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    space: z.enum(['SMALL', 'MEDIUM', 'BIG']),
    adoptionRequirements: z.string(),
  })

  const {
    name,
    description,
    age,
    size,
    energy,
    independence,
    space,
    adoptionRequirements,
  } = createPetBodySchema.parse(request.body)

  try {
    const createPetUseCase = makeCreatePetUseCase()

    await createPetUseCase.execute({
      name,
      description,
      age,
      size,
      energy,
      independence,
      space,
      adoptionRequirements,
      images: request.files,
      orgId: request.user.sub,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    if (err instanceof MinimumOneAdoptionRequirementError || err instanceof MinimumOneImageOfPetError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }



  return reply.status(201).send()
}
