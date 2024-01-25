import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'
import { GENERATE_UUID } from 'App/Utils/generate'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column({ serializeAs: 'lastName' })
  public lastName: string

  @column()
  public email: string

  @column({ serializeAs: 'countryCode' })
  public countryCode: string

  @column()
  public number: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public status: boolean

  @column()
  public profile: string

  @column()
  public type: string

  @column({ serializeAs: 'rememberMeToken' })
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true, serializeAs: 'createdAt' })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: 'updatedAt' })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    user.id = GENERATE_UUID()
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  public static $with = [] as const
}
