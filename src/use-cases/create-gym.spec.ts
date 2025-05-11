import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create gym use case tests', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should to be able to create a new gym', async () => {
    const { gym } = await sut.execute({
      title: 'Jorge Gym',
      description: null,
      phone: null,
      latitude: -3.7068648,
      longitude: -39.6289113,
    })

    expect(gym.id).toEqual(expect.any(String))
    expect(gymsRepository.items.length).toEqual(1)
  })
})
