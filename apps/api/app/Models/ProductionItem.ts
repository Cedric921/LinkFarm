import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import FarmerProduct from './FarmerProduct'
import Unity from './Unity'

export default class ProductionItem extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: null })
  public productId: string

  @column({ serializeAs: null })
  public unityId: string

  @column()
  public description: string

  @column()
  public price: number

  @column()
  public quantity: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => FarmerProduct)
  public product: BelongsTo<typeof FarmerProduct>

  @belongsTo(() => Unity)
  public unity: BelongsTo<typeof Unity>
}
