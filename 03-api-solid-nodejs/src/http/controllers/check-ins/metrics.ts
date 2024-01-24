import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetUserMetricsUseCase } from '@/usecase/factories/make-get-user-metrics-use-case'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const getUserMetricsGymsUseCase = makeGetUserMetricsUseCase()

  const { checkInCount } = await getUserMetricsGymsUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    checkInCount,
  })
}
