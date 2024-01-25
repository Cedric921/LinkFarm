import { CourierClient } from '@trycourier/courier'
import Logger from '@ioc:Adonis/Core/Logger'
import { Imail } from 'interfaces'

async function send(template: string, email: string, data: object) {
  try {
    const courier = new CourierClient({
      authorizationToken: 'dk_prod_C7F53KFMTV441QPW84VPKZGKMFJW',
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
  await send('RVFGKV0G5H45AFGTQTA9K665GYT9', input.to, input.data)
}

export async function sendOtpToUser(input: Imail) {
  await send('RT80Z10YRMMC0CJ3GVFGAP3W2WT4', input.to, input.data)
}
