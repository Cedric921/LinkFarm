import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.post('uploads', 'UploadFilesController.store')
    Route.resource('roles', 'RolesController')
    Route.resource('permissions', 'PermissionsController').except(['update'])
    Route.resource('aggregators', 'AggregatorsController').except(['destroy'])
    Route.post('module-permissions', 'PermissionsController.permissionWithModule')

    Route.get('role-permissions', 'RolePermissionsController.index')
    Route.post('role-permissions/:roleId', 'RolePermissionsController.store') // assign permissions to role
  }).middleware('auth')
}).prefix('api/v1/')
