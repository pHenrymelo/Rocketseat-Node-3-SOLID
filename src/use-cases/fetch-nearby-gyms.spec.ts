import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetcg nearby gyms use cases tests', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should to be able to find nearby gyms', async () => {
    await gymsRepository.create({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -3.7068648,
      longitude: -39.6289113,
    })

    await gymsRepository.create({
      title: 'TypeScript Gym',
      description: null,
      phone: null,
      latitude: -3.7068648,
      longitude: -39.6289113,
    })

    await gymsRepository.create({
      title: 'Java Gym',
      description: null,
      phone: null,
      latitude: -3.596638,
      longitude: -39.573479,
    })

    const { gyms } = await sut.execute({
      userLatitude: -3.7068648,
      userLongitude: -39.6289113,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'JavaScript Gym',
      }),
      expect.objectContaining({
        title: 'TypeScript Gym',
      }),
    ])
  })
})
