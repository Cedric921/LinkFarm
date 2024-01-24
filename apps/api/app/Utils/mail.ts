import { CourierClient } from '@trycourier/courier'
import Logger from '@ioc:Adonis/Core/Logger'
import { Imail } from 'interfaces'

async function send(template: string, email: string, data: object) {
  try {
    const courier = new CourierClient({
      authorizationToken: 'pk_prod_AWZJCRVVWD4NF5GAFW4XS4P1J1B2',
    })
    const { requestId } = await courier.send({
      message: {
        to: {
          email,
        },
        template,
        data,
      },
    })
    Logger.info(requestId)
  } catch (error) {
    console.log(error)
  }
}

export async function sendToUser(input: Imail) {
  await send('FJZ4E5K3XP401DM72NSTNMG6B52T', input.to, input.data)
}

export async function sendOtpToUser(input: Imail) {
  await send('NQT1DDG03YMFV3P6J5FMS31P91V1', input.to, input.data)
}
