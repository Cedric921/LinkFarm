/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import './routes/user.routes'
import './routes/config.routes'
import './routes/produts.routes'
import './routes/transactions.routes'
import AutoSwagger from 'adonis-autoswagger'
import swagger from 'Config/swagger'

Route.get('/', async () => {
  return {
    api: '+- ETIC Api Version 1.0.0',
    author: '+- Upperz',
    documentation: `+- /docs /swagger`,
  }
})

// returns swagger in YAML
Route.get('/swagger', async () => {
  // @ts-expect-error
  return AutoSwagger.docs(Route.toJSON(), swagger)
})

// Renders Swagger-UI and passes YAML-output of /swagger
Route.get('/docs', async () => {
  // @ts-expect-error
  return AutoSwagger.ui('/swagger', swagger)
})
