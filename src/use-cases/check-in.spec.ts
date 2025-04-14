import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './check-in'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check In use cases tests', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)
    vi.useFakeTimers()

    gymsRepository.items.push({
      id: 'gym-1',
      title: 'TypeScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
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
      userLatitude: 0,
      userLongitude: 0,
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
      userLatitude: 0,
      userLongitude: 0,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-1',
        userId: 'user-1',
        userLatitude: 0,
        userLongitude: 0,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should to be able to check in twice in diferent days', async () => {
    vi.setSystemTime(new Date(2025, 3, 14, 15, 0))

    await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1',
      userLatitude: 0,
      userLongitude: 0,
    })

    vi.setSystemTime(new Date(2025, 3, 15, 15, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not to be able to check in in a distant Gym', async () => {
    vi.setSystemTime(new Date(2025, 3, 14, 15, 0))

    gymsRepository.items.push({
      id: 'gym-2',
      title: 'Jorge Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-3.7068648),
      longitude: new Decimal(-39.6289113),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-1',
        userId: 'user-1',
        userLatitude: -3.696638,
        userLongitude: -39.573479,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
