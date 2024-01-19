import { execSync } from 'child_process'
import { afterAll, beforeAll, it, describe, expect, beforeEach } from 'vitest'
import { app } from '../src/app'
import request from 'supertest'

describe('Users routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  it('Should be able to create a new user', async () => {
    const response = await request(app.server)
      .post('/users')
      .send({
        name: 'Jane Doe',
        email: 'janedoe@gmail.com',
      })
      .expect(201)

    const cookies = response.get('Set-Cookie')

    expect(cookies).toEqual(
      expect.arrayContaining([expect.stringContaining('sessionId')]),
    )
  })

  it('Should be able to block the creation of a user that already exists', async () => {
    await request(app.server)
      .post('/users')
      .send({
        name: 'Jane Doe',
        email: 'janedoe@gmail.com',
      })
      .expect(201)

    const response = await request(app.server)
      .post('/users')
      .send({
        name: 'Jane Doe',
        email: 'janedoe@gmail.com',
      })
      .expect(400)

    expect(response.body.message).toEqual('User already exists')
  })
})
