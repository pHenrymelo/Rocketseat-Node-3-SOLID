import type { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'jonny test',
    email: 'jonnytest@test.com',
    password: 'testpassword123',
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
