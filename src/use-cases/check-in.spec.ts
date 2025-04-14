import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CheckInUseCase } from './check-in'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Check In use cases tests', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInsRepository)
  })

  it('should to be able to check in', async () => {
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
})
