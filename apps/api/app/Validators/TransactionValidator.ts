import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class TransactionValidator {
  public idValidator = schema.create({
    id: schema.string({}, [rules.uuid(), rules.exists({ table: 'transactions', column: 'id' })]),
  })

  public createValidator = schema.create({
    amount: schema.number(),
    // from ctrl
    walletId: schema.string.optional(),
    isValidate: schema.boolean.optional(),
    userId: schema.string.optional(),
    type: schema.string.optional(),
  })

  public createDepositValidator = schema.create({
    amount: schema.number(),
    aggregatorId: schema.string(),
    // from ctrl
    walletId: schema.string.optional(),
    isValidate: schema.boolean.optional(),
    type: schema.string.optional(),
    userId: schema.string.optional(),
  })

  public validateWithdrawValidator = schema.create({
    validate: schema.boolean(),
  })
}
