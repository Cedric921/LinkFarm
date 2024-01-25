import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.post('login', 'AuthController.login')
    Route.post('register', 'AuthController.register')
    Route.post('validate', 'AuthController.validateAccount')
    Route.post('get-otp', 'AuthController.getOpt') //to send otp in mail
    Route.post('check-otp', 'AuthController.getTokenToResetPassword') // to get token by otp
  }).prefix('auth')

  Route.group(() => {
    Route.put('users/active/:id', 'UsersController.active')
    Route.put('users/deactive/:id', 'UsersController.deactive')
    Route.resource('users', 'UsersController')
    Route.resource('wallets', 'WalletsController').except(['destroy', 'edit'])
    Route.put('reset-pwd', 'UsersController.resetPassword') //for reset password
    Route.put('logout', 'UsersController.logOut')
    Route.put('user-role/:id', 'UsersController.assignRole')
  }).middleware('auth')
}).prefix('api/v1')
