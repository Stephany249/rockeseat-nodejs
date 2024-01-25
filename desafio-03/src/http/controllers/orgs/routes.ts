import { FastifyInstance } from 'fastify'
import { org } from './org'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', org)
}
