import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import type { FastifyInstance } from 'fastify'
import { create } from './create'
import { findNearby } from './nearby'
import { search } from './search'

export async function gymRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', findNearby)

  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, create)
}
