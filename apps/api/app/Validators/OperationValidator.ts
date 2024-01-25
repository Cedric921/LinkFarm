import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class OperationValidator {
  public idValidator = schema.create({
    id: schema.string({}, [rules.uuid(), rules.exists({ table: 'operations', column: 'id' })]),
  })

  public createValidator = schema.create({
    articleId: schema.string.optional(),
    // from ctrl
    type: schema.string.optional(),
    userId: schema.string.optional(),
    amount: schema.number.optional(),
  })
}
