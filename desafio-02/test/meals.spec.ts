import { execSync } from 'child_process'
import { afterAll, beforeAll, it, describe, beforeEach, expect } from 'vitest'
import { app } from '../src/app'
import request from 'supertest'
import { randomUUID } from 'crypto'

describe('Meals routes', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let userResponse: any

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
    userResponse = await request(app.server)
      .post('/users')
      .send({
        name: 'Jane Doe',
        email: 'janedoe2@gmail.com',
      })
      .expect(201)
  })

  it('Should be able to create a new meals', async () => {
    await request(app.server)
      .post('/meals')
      .set('Cookie', userResponse.get('Set-Cookie'))
      .send({
        name: 'Breakfast',
        description: "It's a breakfast",
        isOnDiet: true,
        date: new Date(),
      })
      .expect(201)
  })

  it('Should be able to list all meals', async () => {
    await request(app.server)
      .post('/meals')
      .set('Cookie', userResponse.get('Set-Cookie'))
      .send({
        name: 'Breakfast',
        description: "It's a breakfast",
        isOnDiet: true,
        date: new Date(),
      })
      .expect(201)

    await request(app.server)
      .post('/meals')
      .set('Cookie', userResponse.get('Set-Cookie'))
      .send({
        name: 'Lunch',
        description: "It's a lunch",
        isOnDiet: true,
        date: new Date(),
      })
      .expect(201)

    const listMealsResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', userResponse.get('Set-Cookie'))

    expect(listMealsResponse.body.meals.length).toEqual(2)
    expect(listMealsResponse.body.meals[0]).toEqual(
      expect.objectContaining({
        name: 'Breakfast',
        description: "It's a breakfast",
      }),
    )
  })

  it('Should be able to get a specific meal', async () => {
    await request(app.server)
      .post('/meals')
      .set('Cookie', userResponse.get('Set-Cookie'))
      .send({
        name: 'Breakfast',
        description: "It's a breakfast",
        isOnDiet: true,
        date: new Date(),
      })
      .expect(201)

    await request(app.server)
      .post('/meals')
      .set('Cookie', userResponse.get('Set-Cookie'))
      .send({
        name: 'Lunch',
        description: "It's a lunch",
        isOnDiet: true,
        date: new Date(),
      })
      .expect(201)

    const listMealsResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', userResponse.get('Set-Cookie'))

    const mealId = listMealsResponse.body.meals[1].id

    const getMealResponse = await request(app.server)
      .get(`/meals/${mealId}`)
      .set('Cookie', userResponse.get('Set-Cookie'))
      .expect(200)

    expect(getMealResponse.body.meal).toEqual(
      expect.objectContaining({
        name: 'Lunch',
        description: "It's a lunch",
      }),
    )
  })

  it('Should be able to list the metrics', async () => {
    await request(app.server)
      .post('/meals')
      .set('Cookie', userResponse.get('Set-Cookie'))
      .send({
        name: 'Breakfast',
        description: "It's a breakfast",
        isOnDiet: true,
        date: new Date(),
      })
      .expect(201)

    await request(app.server)
      .post('/meals')
      .set('Cookie', userResponse.get('Set-Cookie'))
      .send({
        name: 'Lunch',
        description: "It's a lunch",
        isOnDiet: false,
        date: new Date(),
      })
      .expect(201)

    await request(app.server)
      .post('/meals')
      .set('Cookie', userResponse.get('Set-Cookie'))
      .send({
        name: 'Dinner',
        description: "It's a dinner",
        isOnDiet: true,
        date: new Date(),
      })
      .expect(201)

    await request(app.server)
      .post('/meals')
      .set('Cookie', userResponse.get('Set-Cookie'))
      .send({
        name: 'Supper',
        description: "It's a supper",
        isOnDiet: true,
        date: new Date(),
      })
      .expect(201)

    const getMetricsResponse = await request(app.server)
      .get('/meals/metrics')
      .set('Cookie', userResponse.get('Set-Cookie'))
      .expect(200)

    console.log(getMetricsResponse.body)

    expect(getMetricsResponse.body).toEqual({
      totalMeals: 4,
      totalMealsOnDiet: 3,
      totalMealsOffDiet: 1,
      bestOnDietSequence: 2,
    })
  })

  it('Should be able to update a meal', async () => {
    await request(app.server)
      .post('/meals')
      .set('Cookie', userResponse.get('Set-Cookie'))
      .send({
        name: 'Breakfast',
        description: "It's a breakfast",
        isOnDiet: true,
        date: new Date(),
      })
      .expect(201)

    const listMealsResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', userResponse.get('Set-Cookie'))

    const mealId = listMealsResponse.body.meals[0].id

    await request(app.server)
      .put(`/meals/${mealId}`)
      .set('Cookie', userResponse.get('Set-Cookie'))
      .send({
        name: 'Brekker',
        description: "It's a brekker",
        isOnDiet: true,
        date: new Date('2024-01-18T15:00:00'),
      })
      .expect(204)
  })

  it('Should be able to remove a meal', async () => {
    await request(app.server)
      .post('/meals')
      .set('Cookie', userResponse.get('Set-Cookie'))
      .send({
        name: 'Breakfast',
        description: "It's a breakfast",
        isOnDiet: true,
        date: new Date(),
      })
      .expect(201)

    const listMealsResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', userResponse.get('Set-Cookie'))

    const mealId = listMealsResponse.body.meals[0].id

    await request(app.server)
      .delete(`/meals/${mealId}`)
      .set('Cookie', userResponse.get('Set-Cookie'))
      .expect(204)
  })

  describe('Unauthorized', () => {
    it('Should not be able to list meals that are not yours', async () => {
      await request(app.server)
        .post('/meals')
        .set('Cookie', userResponse.get('Set-Cookie'))
        .send({
          name: 'Breakfast',
          description: "It's a breakfast",
          isOnDiet: true,
          date: new Date(),
        })
        .expect(201)

      const listMealsResponse = await request(app.server)
        .get('/meals')
        .set('Cookie', userResponse.get('Set-Cookie'))

      const mealId = listMealsResponse.body.meals[0].id

      const getMealResponse = await request(app.server)
        .get(`/meals/${mealId}`)
        .set('Cookie', randomUUID())
        .expect(401)

      expect(getMealResponse.body.error).toEqual('Unauthorized')
    })

    it(`You shouldn't be able to edit meals that aren't yours`, async () => {
      await request(app.server)
        .post('/meals')
        .set('Cookie', userResponse.get('Set-Cookie'))
        .send({
          name: 'Breakfast',
          description: "It's a breakfast",
          isOnDiet: true,
          date: new Date(),
        })
        .expect(201)

      const listMealsResponse = await request(app.server)
        .get('/meals')
        .set('Cookie', userResponse.get('Set-Cookie'))

      const mealId = listMealsResponse.body.meals[0].id

      const getMealResponse = await request(app.server)
        .put(`/meals/${mealId}`)
        .set('Cookie', randomUUID())
        .send({
          name: 'Brekker',
          description: "It's a brekker",
          isOnDiet: true,
          date: new Date('2024-01-18T15:00:00'),
        })
        .expect(401)

      expect(getMealResponse.body.error).toEqual('Unauthorized')
    })

    it('Should not be able to remove a meal that is not yours', async () => {
      await request(app.server)
        .post('/meals')
        .set('Cookie', userResponse.get('Set-Cookie'))
        .send({
          name: 'Breakfast',
          description: "It's a breakfast",
          isOnDiet: true,
          date: new Date(),
        })
        .expect(201)

      const listMealsResponse = await request(app.server)
        .get('/meals')
        .set('Cookie', userResponse.get('Set-Cookie'))

      const mealId = listMealsResponse.body.meals[0].id

      const deleteMealResponse = await request(app.server)
        .delete(`/meals/${mealId}`)
        .set('Cookie', randomUUID())
        .expect(401)

      expect(deleteMealResponse.body.error).toEqual('Unauthorized')
    })
  })

  describe('Meal not found', () => {
    it(`Shouldn't be able to list a meal that doesn't exist`, async () => {
      await request(app.server)
        .post('/meals')
        .set('Cookie', userResponse.get('Set-Cookie'))
        .send({
          name: 'Breakfast',
          description: "It's a breakfast",
          isOnDiet: true,
          date: new Date(),
        })
        .expect(201)

      const getMealResponse = await request(app.server)
        .get(`/meals/${randomUUID()}`)
        .set('Cookie', userResponse.get('Set-Cookie'))
        .expect(404)

      expect(getMealResponse.body.error).toEqual('Meal not found')
    })

    it(`Shouldn't be able to edit a meal that doesn't exist`, async () => {
      await request(app.server)
        .post('/meals')
        .set('Cookie', userResponse.get('Set-Cookie'))
        .send({
          name: 'Breakfast',
          description: "It's a breakfast",
          isOnDiet: true,
          date: new Date(),
        })
        .expect(201)

      const getMealResponse = await request(app.server)
        .put(`/meals/${randomUUID()}`)
        .set('Cookie', userResponse.get('Set-Cookie'))
        .send({
          name: 'Breakfast',
          description: "It's a breakfast",
          isOnDiet: true,
          date: new Date(),
        })
        .expect(404)

      expect(getMealResponse.body.error).toEqual('Meal not found')
    })

    it(`Should not be able to delete a meal that does not exist`, async () => {
      await request(app.server)
        .post('/meals')
        .set('Cookie', userResponse.get('Set-Cookie'))
        .send({
          name: 'Breakfast',
          description: "It's a breakfast",
          isOnDiet: true,
          date: new Date(),
        })
        .expect(201)

      const getMealResponse = await request(app.server)
        .delete(`/meals/${randomUUID()}`)
        .set('Cookie', userResponse.get('Set-Cookie'))
        .expect(404)

      expect(getMealResponse.body.error).toEqual('Meal not found')
    })
  })
})
