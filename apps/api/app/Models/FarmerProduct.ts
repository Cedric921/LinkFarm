import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Product from './Product'

export default class FarmerProduct extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  productId: string

  @column()
  userId: string

  @column()
  price: number

  @column()
  description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>
}
