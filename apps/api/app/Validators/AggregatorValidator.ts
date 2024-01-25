import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class AggregatorValidator {
  public idValidator = schema.create({
    id: schema.string({}, [rules.uuid(), rules.exists({ table: 'articles', column: 'id' })]),
  })

  public createValidator = schema.create({
    marchantId: schema.string([rules.minLength(3)]),
    name: schema.string([rules.minLength(3)]),
    others: schema.string.optional(),
    current: schema.boolean.optional(),
  })

  public updateValidator = schema.create({
    marchantId: schema.string.optional([rules.minLength(3)]),
    name: schema.string.optional([rules.minLength(3)]),
    others: schema.string.optional(),
    current: schema.boolean.optional(),
  })
}
