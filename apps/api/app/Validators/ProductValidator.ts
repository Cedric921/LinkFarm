import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class ProductValidator {
  public idValidator = schema.create({
    id: schema.string({}, [rules.uuid(), rules.exists({ table: 'products', column: 'id' })]),
  })

  public createValidator = schema.create({
    designation: schema.string(),
    description: schema.string.optional(),
    // rotAt: schema.date.optional(),
  })

  public updateValidator = schema.create({
    designation: schema.string.optional(),
    description: schema.string.optional(),
    // rotAt: schema.date.optional(),
  })
}
