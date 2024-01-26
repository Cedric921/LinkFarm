import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.resource('products', 'ProductsController')
    Route.resource('farmer-products', 'FarmerProductsController').only(['store', 'index', 'show'])
  }).middleware('auth')

  Route.group(() => {
    Route.resource('products', 'ProductsController').except(['store', 'update', 'destroy'])
  })
}).prefix('api/v1')
