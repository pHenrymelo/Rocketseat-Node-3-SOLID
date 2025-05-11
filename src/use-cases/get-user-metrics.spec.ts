import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Get user metrics use cases tests', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)
  })

  it('should to be able to count the total amount of a user check-ins', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-1',
      user_id: 'user-1',
    })

    await checkInsRepository.create({
      gym_id: 'gym-2',
      user_id: 'user-1',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-1',
    })

    expect(checkInsCount).toEqual(2)
  })
})
