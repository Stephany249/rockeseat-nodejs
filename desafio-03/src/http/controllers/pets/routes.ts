import { FastifyInstance } from 'fastify'
import multer from 'fastify-multer'
import { create } from './create'
import { verifyJwt } from '@/http/middlewares/verify-jwt'

import uploadConfig from '@/config/upload'
import { getPet } from './get-pet'
import { listPets } from './list-pets'

const upload = multer(uploadConfig)
export async function petsRoutes(app: FastifyInstance) {
  app.post(
    '/pets',
    { onRequest: verifyJwt, preHandler: upload.array('images', 6) },
    create,
  )

  app.get('/pets/show/:petId', getPet)
  app.get('/pets/:city', listPets)
}
