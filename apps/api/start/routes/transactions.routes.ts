import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.resource('transactions', 'TransactionsController').except(['create', 'update'])
    Route.post('withdraw', 'TransactionsController.withdraw')
    Route.post('deposit', 'TransactionsController.deposit')
    Route.post('aggregator', 'TransactionsController.aggregatorSuccess')
    Route.put('validate', 'TransactionsController.validateWithdraw')
  }).middleware('auth')
}).prefix('api/v1')
