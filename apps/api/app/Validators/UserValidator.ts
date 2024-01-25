import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class UserValidator {
  public idValidator = schema.create({
    id: schema.string({}, [rules.uuid(), rules.exists({ table: 'users', column: 'id' })]),
  })

  /* A validation for the login route. */
  public loginValidator = schema.create({
    email: schema.string.optional([rules.email()]),
    number: schema.string.optional(),
    password: schema.string(),
  })

  public registerValidator = schema.create({
    email: schema.string.optional([rules.email()]),
    number: schema.string.optional(),
    password: schema.string(),
    name: schema.string(),
    lastname: schema.string.optional(),
    countryCode: schema.string.optional(),
    // from ctrl
    status: schema.boolean.optional(),
    profile: schema.string.optional(),
    type: schema.string.optional(),
  })

  public changePasswordValidator = schema.create({
    oldPassword: schema.string(),
    password: schema.string([rules.minLength(4), rules.confirmed()]),
  })

  public getOtpValidator = schema.create({
    email: schema.string([rules.email(), rules.exists({ table: 'users', column: 'email' })]),
  })

  public validateOtpValidator = schema.create({
    email: schema.string([rules.email()]),
    otp: schema.number(),
  })

  public resetPasswordValidator = schema.create({
    password: schema.string([rules.minLength(4)]),
  })
}
