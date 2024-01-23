import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CheckInUseCase } from '@/usecase/check-in'
import { MaxDistanceError } from '@/usecase/errors/max-distance-error'
import { Decimal } from '@prisma/client/runtime/library'
import { randomUUID } from 'crypto'
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let checkInUseCase: CheckInUseCase

describe('Check In Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    checkInUseCase = new CheckInUseCase(checkInsRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'gym-01',
      title: 'Javascript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-30.039453),
      longitude: new Decimal(-51.1839137),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await checkInUseCase.execute({
      gymId: 'gym-01',
      userId: randomUUID(),
      userLatitude: -30.039453,
      userLongitude: -51.1839137,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2024, 0, 22, 15, 7, 0))

    const userId = randomUUID()

    await checkInUseCase.execute({
      gymId: 'gym-01',
      userId,
      userLatitude: -30.039453,
      userLongitude: -51.1839137,
    })

    await expect(() =>
      checkInUseCase.execute({
        gymId: 'gym-01',
        userId,
        userLatitude: -30.039453,
        userLongitude: -51.1839137,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2024, 0, 22, 15, 7, 0))

    const userId = randomUUID()

    await checkInUseCase.execute({
      gymId: 'gym-01',
      userId,
      userLatitude: -30.039453,
      userLongitude: -51.1839137,
    })

    vi.setSystemTime(new Date(2024, 0, 21, 15, 7, 0))

    const { checkIn } = await checkInUseCase.execute({
      gymId: 'gym-01',
      userId,
      userLatitude: -30.039453,
      userLongitude: -51.1839137,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Javascript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-29.8725792),
      longitude: new Decimal(-50.4303203),
    })

    await expect(() =>
      checkInUseCase.execute({
        gymId: 'gym-02',
        userId: randomUUID(),
        userLatitude: -30.039453,
        userLongitude: -51.1839137,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
