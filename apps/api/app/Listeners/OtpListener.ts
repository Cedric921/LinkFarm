import type { EventsList } from '@ioc:Adonis/Core/Event'
import { sendOtpToUser } from 'App/Utils/mail'

export default class Otplistener {
  public async on_new_otp(_input: EventsList['new:otp']) {
    // send otp to user mail

    sendOtpToUser({
      to: _input.email,
      data: {
        names: _input.email,
        otp: _input.value,
      },
    })
    console.log(JSON.stringify(_input))
  }
}
