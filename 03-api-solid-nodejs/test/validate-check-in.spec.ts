import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { LateCheckInValidationError } from '@/usecase/errors/late-check-in-validation-error'
import { ResourceNotFoundError } from '@/usecase/errors/resource-not-found-error'
import { ValidateCheckInUseCase } from '@/usecase/validate-check-in'
import { randomUUID } from 'crypto'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

let checkInsRepository: InMemoryCheckInsRepository
let validateCheckInUseCase: ValidateCheckInUseCase

describe('Validate Check In Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    validateCheckInUseCase = new ValidateCheckInUseCase(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: randomUUID(),
      user_id: randomUUID(),
    })

    const { checkIn } = await validateCheckInUseCase.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate tan inexistent check in', async () => {
    await expect(
      validateCheckInUseCase.execute({
        checkInId: randomUUID(),
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate check in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2024, 0, 23, 12, 20))

    const createdCheckIn = await checkInsRepository.create({
      gym_id: randomUUID(),
      user_id: randomUUID(),
    })

    const twentyOneMinutesInMs = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinutesInMs)

    await expect(
      validateCheckInUseCase.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidationError)
  })
})
