import { DateTime } from 'luxon'
import { BaseModel, afterSave, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import Event from '@ioc:Adonis/Core/Event'
import { GENERATE_UUID, GENETRATE_NUMBER } from 'App/Utils/generate'

export default class Otp extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public type: number

  @column()
  public value: number

  @column()
  public email: string

  @column.dateTime({ serializeAs: 'expiresAt' })
  public expiresAt: DateTime

  @column.dateTime({ autoCreate: true, serializeAs: 'createdAt' })
  public createdAt: DateTime

  @beforeSave()
  public static async init_value(model: Otp) {
    model.id = GENERATE_UUID()
    model.value = GENETRATE_NUMBER(6)
  }

  @afterSave()
  public static async send_mail(otp: Otp) {
    Event.emit('new:otp', otp)
  }
}
