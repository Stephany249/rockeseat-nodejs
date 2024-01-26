import { OrgEmailAlreadyExistsError } from '@/usecase/errors/org-email-already-exists-error'
import { PasswordsDoNotMatchError } from '@/usecase/errors/password-do-not-match-error'
import { makeOrgUseCase } from '@/usecase/factories/make-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function org(request: FastifyRequest, reply: FastifyReply) {
  const orgBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    cep: z.string(),
    address: z.string(),
    whatsapp: z.string(),
    password: z.string(),
    passwordConfirm: z.string(),
  })

  const { name, email, cep, address, whatsapp, password, passwordConfirm } =
    orgBodySchema.parse(request.body)

  try {
    const orgUseCase = makeOrgUseCase()

    await orgUseCase.execute({
      name,
      email,
      cep,
      address,
      whatsapp,
      password,
      passwordConfirm,
    })
  } catch (err) {
    if (err instanceof OrgEmailAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    if (err instanceof PasswordsDoNotMatchError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
