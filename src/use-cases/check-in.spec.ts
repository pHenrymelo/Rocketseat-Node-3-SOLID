import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './check-in'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Check In use cases tests', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInsRepository)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should to be able to check in', async () => {
    vi.setSystemTime(new Date(2025, 3, 14, 15, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1',
    })

    expect(checkIn.id).toEqual(expect.any(String))
    expect(checkInsRepository.items.length).toBe(1)
    expect(checkInsRepository.items[0]).contain({
      gym_id: 'gym-1',
      user_id: 'user-1',
    })
  })

  it('should not to be able to check in twice a day', async () => {
    vi.setSystemTime(new Date(2025, 3, 14, 15, 0))

    await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1',
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-1',
        userId: 'user-1',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should to be able to check in twice in diferent days', async () => {
    vi.setSystemTime(new Date(2025, 3, 14, 15, 0))

    await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1',
    })

    vi.setSystemTime(new Date(2025, 3, 15, 15, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
