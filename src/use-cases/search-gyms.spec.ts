import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search gyms use cases tests', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should to be able to search a gym', async () => {
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

    const { gyms } = await sut.execute({
      query: 'TypeScript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'TypeScript Gym',
      }),
    ])
  })

  it('should to be able to paginate the user check ins history', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `TypeScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -3.7068648,
        longitude: -39.6289113,
      })
    }

    const { gyms } = await sut.execute({
      query: 'TypeScript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'TypeScript Gym 21',
      }),
      expect.objectContaining({
        title: 'TypeScript Gym 22',
      }),
    ])
  })
})
