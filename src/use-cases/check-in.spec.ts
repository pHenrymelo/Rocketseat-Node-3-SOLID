import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './check-in'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check In use cases tests', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)
    vi.useFakeTimers()

    await gymsRepository.create({
      id: 'gym-1',
      title: 'TypeScript Gym',
      description: '',
      phone: '',
      latitude: -3.696638,
      longitude: -39.573479,
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should to be able to check in', async () => {
    vi.setSystemTime(new Date(2025, 3, 14, 15, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1',
      userLatitude: -3.696638,
      userLongitude: -39.573479,
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
      userLatitude: -3.696638,
      userLongitude: -39.573479,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-1',
        userId: 'user-1',
        userLatitude: -3.696638,
        userLongitude: -39.573479,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should to be able to check in twice in diferent days', async () => {
    vi.setSystemTime(new Date(2025, 3, 14, 15, 0))

    await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1',
      userLatitude: -3.696638,
      userLongitude: -39.573479,
    })

    vi.setSystemTime(new Date(2025, 3, 15, 15, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1',
      userLatitude: -3.696638,
      userLongitude: -39.573479,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not to be able to check in in a distant Gym', async () => {
    vi.setSystemTime(new Date(2025, 3, 14, 15, 0))

    await gymsRepository.create({
      id: 'gym-2',
      title: 'Jorge Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-3.7068648),
      longitude: new Decimal(-39.6289113),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-2',
        userId: 'user-1',
        userLatitude: -3.696638,
        userLongitude: -39.573479,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
