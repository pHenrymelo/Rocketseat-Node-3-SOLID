import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('authenticate (e2e) tests', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('shoud to be able to authenticate', async () => {
    await request(app.server).post('/users').send({
      name: 'jonny test',
      email: 'jonnytest@test.com',
      password: 'testpassword123',
    })

    const authResponse = await request(app.server).post('/session').send({
      email: 'jonnytest@test.com',
      password: 'testpassword123',
    })

    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
