import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from '@/usecase/create-gym'

let gymsRepository: InMemoryGymsRepository
let createGymUseCase: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    createGymUseCase = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to register ', async () => {
    const { gym } = await createGymUseCase.execute({
      title: 'Javascrip Gym',
      description: null,
      phone: null,
      latitude: -30.039453,
      longitude: -51.1839137,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
