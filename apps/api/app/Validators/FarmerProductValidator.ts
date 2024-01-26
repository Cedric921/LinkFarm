import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class FarmerProductValidator {
  public idValidator = schema.create({
    id: schema.string({}, [rules.uuid(), rules.exists({ table: 'products', column: 'id' })]),
  })

  public createValidator = schema.create({
    designation: schema.string.optional(),
    description: schema.string.optional(),
    price: schema.number(),

    // rotAt: schema.date.optional(),
    userId: schema.string.optional(),
    productId: schema.string.optional(),
  })
}
