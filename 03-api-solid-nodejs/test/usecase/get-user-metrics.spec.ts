import { beforeEach, describe, it, expect } from 'vitest'
import { randomUUID } from 'crypto'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsUseCase } from '@/usecase/get-user-metrics'

let checkInsRepository: InMemoryCheckInsRepository
let getUserMetricsUseCase: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    getUserMetricsUseCase = new GetUserMetricsUseCase(checkInsRepository)
  })

  it('should be able to get check in count from metrics', async () => {
    const userId = randomUUID()
    await checkInsRepository.create({
      gym_id: randomUUID(),
      user_id: userId,
    })

    await checkInsRepository.create({
      gym_id: randomUUID(),
      user_id: userId,
    })

    const { checkInCount } = await getUserMetricsUseCase.execute({
      userId,
    })

    expect(checkInCount).toEqual(2)
  })
})
