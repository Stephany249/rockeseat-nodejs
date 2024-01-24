import request from 'supertest'

import { FastifyInstance } from 'fastify'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'Jane Doe',
    email: 'janeDoe@gmail.com',
    password: '123456',
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'janeDoe@gmail.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
