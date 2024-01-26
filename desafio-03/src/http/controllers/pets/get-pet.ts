import { ResourceNotFoundError } from '@/usecase/errors/resource-not-found-error'
import { makeGetPetUseCase } from '@/usecase/factories/make-get-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'


export async function getPet(request: FastifyRequest, reply: FastifyReply) {
  const getPetParamsSchema = z.object({
    petId: z.coerce.string().uuid(),
  })

  const { petId } = getPetParamsSchema.parse(request.params)

  try {
    const getPetUseCase = makeGetPetUseCase()

    const { pet } = await getPetUseCase.execute({
      petId
    })

    return reply.status(200).send({ pet })

  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}

