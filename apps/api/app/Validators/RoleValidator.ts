import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'

export default class RoleValidator {
  public createRoleValidator = schema.create({
    designation: schema.string([rules.maxLength(20)]),
    description: schema.string.optional([rules.maxLength(200)]),
  })

  public updateRoleValidator = schema.create({
    designation: schema.string.optional([rules.maxLength(20)]),
    description: schema.string.optional([rules.maxLength(200)]),
  })

  public idRoleValidator = schema.create({
    id: schema.string([rules.exists({ table: 'roles', column: 'id' })]),
  })

  public messages: CustomMessages = {}
}
