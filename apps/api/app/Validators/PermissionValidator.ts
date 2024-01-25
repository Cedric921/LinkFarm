import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import { EPermision } from 'App/Utils/Enums'

export default class PermissionValidator {
  public createPermissionValidator = schema.create({
    module: schema.string([rules.maxLength(20)]),
    description: schema.string.optional([rules.maxLength(200)]),
    permission: schema.enum(Object.values(EPermision)),
  })

  public updatePermissionValidator = schema.create({
    description: schema.string([rules.maxLength(200)]),
  })

  public idRoleValidator = schema.create({
    roleId: schema.string([rules.uuid(), rules.exists({ table: 'roles', column: 'id' })]),
  })

  /* Validating the update of the role permission. */
  public updateRolePermissionValidator = schema.create({
    permissions: schema.array().members(
      schema.object().members({
        roleId: schema.string.optional(),
        permissionId: schema.string([
          rules.uuid(),
          rules.exists({ table: 'permissions', column: 'id' }),
        ]),
      })
    ),
  })

  public idUserValidator = schema.create({
    userId: schema.string([rules.uuid(), rules.exists({ table: 'users', column: 'id' })]),
  })

  public moduleUniqueValidator = schema.create({
    module: schema.string([rules.unique({ table: 'permissions', column: 'module' })]),
  })

  public idPermissionValidator = schema.create({
    id: schema.string([rules.exists({ table: 'permissions', column: 'id' })]),
  })

  public messages: CustomMessages = {}
}
