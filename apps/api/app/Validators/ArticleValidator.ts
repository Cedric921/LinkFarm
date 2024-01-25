import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class ArticleValidator {
  public idValidator = schema.create({
    id: schema.string({}, [rules.uuid(), rules.exists({ table: 'articles', column: 'id' })]),
  })

  public createValidator = schema.create({
    designation: schema.string([rules.minLength(3)]),
    description: schema.string([rules.minLength(3)]),
    qt: schema.number.optional(),
    price: schema.number(),
    benefit: schema.number(),
    published: schema.boolean.optional(),
    userId: schema.string.optional([rules.uuid(), rules.exists({ table: 'users', column: 'id' })]),
  })

  public updateValidator = schema.create({
    designation: schema.string.optional([rules.minLength(3)]),
    description: schema.string.optional([rules.minLength(3)]),
    qt: schema.number.optional(),
    price: schema.number.optional(),
    benefit: schema.number.optional(),
    published: schema.boolean.optional(),
  })

  public addImagesValidator = schema.create({
    images: schema.array([rules.minLength(1)]).members(
      schema.object().members({
        url: schema.string(),
        articleId: schema.string.optional(),
      })
    ),
  })

  public idImageValidator = schema.create({
    id: schema.string([rules.exists({ table: 'article_images', column: 'id' })]),
  })
}
