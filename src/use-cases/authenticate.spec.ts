import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate use cases Tests', () => {
  it('shoud to be able to authenticate a user', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'Jonny test',
      email: 'jonnytest@gmail.com',
      password_hash: await hash('jtest1234', 6),
    })

    const { user } = await sut.execute({
      email: 'jonnytest@gmail.com',
      password: 'jtest1234',
    })

    expect(user.name).toEqual('Jonny test')
  })

  it('shoud not to be able to authenticate a user with wrong email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    await expect(() =>
      sut.execute({
        email: 'jonnytest@gmail.com',
        password: 'jtest1234',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('shoud not to be able to authenticate a user with wrong password', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'Jonny test',
      email: 'jonnytest@gmail.com',
      password_hash: await hash('jtest1234', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'jonnytest@gmail.com',
        password: 'ktest1234',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
