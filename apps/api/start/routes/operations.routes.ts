import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.put('articles/publish/:id', 'ArticlesController.publish')
    Route.put('articles/un-publish/:id', 'ArticlesController.unPublish')
    Route.post('articles/images/:id', 'ArticleImagesController.store')
    Route.delete('articles/images/:id', 'ArticleImagesController.destroy')
    Route.resource('articles', 'ArticlesController').only(['create', 'update', 'destroy'])
    Route.resource('operations', 'OperationsController').except(['create', 'update'])
    Route.post('operations/sale', 'OperationsController.sale')
    Route.post('operations/purchase', 'OperationsController.purchase')
  }).middleware('auth')

  Route.group(() => {
    Route.resource('articles', 'ArticlesController').except(['create', 'update', 'destroy'])
  })
}).prefix('api/v1')
