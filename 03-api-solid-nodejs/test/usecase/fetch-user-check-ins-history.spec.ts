import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

import { FetchUserCheckInsHistoryUseCase } from '@/usecase/fetch-user-check-ins-history'

import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'

let checkInsRepository: InMemoryCheckInsRepository
let fetchUserCheckInsHistoryUseCase: FetchUserCheckInsHistoryUseCase

describe('Fetch User Check Ins History Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    fetchUserCheckInsHistoryUseCase = new FetchUserCheckInsHistoryUseCase(
      checkInsRepository,
    )
  })

  it('should be able to fetch check in history', async () => {
    const userId = randomUUID()
    const gym_01 = randomUUID()
    const gym_02 = randomUUID()
    await checkInsRepository.create({
      gym_id: gym_01,
      user_id: userId,
    })

    await checkInsRepository.create({
      gym_id: gym_02,
      user_id: userId,
    })

    const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
      userId,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: gym_01 }),
      expect.objectContaining({ gym_id: gym_02 }),
    ])
  })

  it('should be able to fetch paginated check in history', async () => {
    const userId = randomUUID()

    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym-${i}`,
        user_id: userId,
      })
    }

    const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
      userId,
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ])
  })
})
