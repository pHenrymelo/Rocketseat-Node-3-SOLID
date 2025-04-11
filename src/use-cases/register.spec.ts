import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'
import { compare } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'

describe('Register use cases tests', () => {
  it('should hash user password upon user registration', async () => {
    const usersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'Jonny Test',
      email: 'jonnytest@gmail.com',
      password: 'jtest1234',
    })

    const isPasswordCorrectlyHashed = await compare(
      'jtest1234',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
