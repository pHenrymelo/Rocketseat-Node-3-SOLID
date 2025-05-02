import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('register (e2e) tests', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('shoud to be able to register', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'jonny test',
      email: 'jonnytest@test.com',
      password: 'testpassword123',
    })
    expect(response.statusCode).toEqual(201)
  })
})
