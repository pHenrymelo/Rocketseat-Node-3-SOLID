import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('profile (e2e) tests', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('shoud to be able to get user profile', async () => {
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

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body).toEqual(
      expect.objectContaining({
        user: expect.objectContaining({
          email: 'jonnytest@test.com',
        }),
      }),
    )
  })
})
