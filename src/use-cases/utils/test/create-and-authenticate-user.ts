import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import type { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  const user = await prisma.user.create({
    data: {
      name: 'Jonny Test',
      email: 'jonnytest@test.com',
      password_hash: await hash('testpassword123', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await request(app.server).post('/session').send({
    email: 'jonnytest@test.com',
    password: 'testpassword123',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
