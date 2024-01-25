import { FastifyInstance } from 'fastify'
import { org } from './org'
import { authenticate } from './authenticate'
import { refresh } from './refresh'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', org)

  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)
}
