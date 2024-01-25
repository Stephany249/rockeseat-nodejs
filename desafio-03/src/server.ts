import { app } from './app'
import { env } from './env'
import { orgsRoutes } from './http/controllers/orgs/routes'

app.register(orgsRoutes)

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })
