import Logger from '@ioc:Adonis/Core/Logger'
import Hash from '@ioc:Adonis/Core/Hash'
import { inject } from '@adonisjs/fold'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UserService } from 'App/Services/User.service'
import UserValidator from 'App/Validators/UserValidator'
import { ETypeUser, EtypeOtp } from 'App/Utils/Enums'
import User from 'App/Models/User'
import { OtpService } from 'App/Services/Otp.service'
import { GENERATE_MINUTES } from 'App/Utils/generate'

@inject()
export default class AuthController extends UserValidator {
  constructor(
    private userService: UserService,
    private otpService: OtpService
  ) {
    super()
  }
  public async login({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate({
      schema: this.loginValidator,
    })
    try {
      // check if email or number is provided
      const { email, number } = payload
      console.log({ email, number })
      // get user but email/number
      const existUser = await this.userService.signing({ email, number })
      // check password
      if (!existUser?.status)
        return response.notFound({
          status: false,
          message: 'auth error',
        })

      if (!(await Hash.verify(existUser?.password!, payload.password)))
        return response.notFound({
          status: false,
          message: 'auth error',
        })
      // generate token
      const token = await auth.use('api').generate(existUser!)
      //  return data
      return response.ok({
        status: true,
        message: 'connected',
        data: {
          user: existUser,
          token,
        },
      })
    } catch (error) {
      Logger.error(error.message)
      return response.expectationFailed({
        status: false,
        message: 'internal server error',
      })
    }
  }

  public async register({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate({
      schema: this.registerValidator,
    })
    try {
      // type & status
      payload.type = ETypeUser.USER
      payload.status = payload.email ? false : true

      const user = await User.create(payload)

      if (payload.email) {
        await this.otpService.get({
          email: user.email,
          type: EtypeOtp.VALIDATE_ACCOUNT,
        })
      }

      // generate token
      const token = await auth.use('api').generate(user!)

      return response.ok({
        status: true,
        message: 'account created',
        data: {
          user: user,
          token,
        },
      })
    } catch (error) {
      Logger.error(error.message)
      return response.expectationFailed({
        status: false,
        message: 'internal server error',
      })
    }
  }

  public async validateAccount({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate({
      schema: this.validateOtpValidator,
    })
    try {
      const existOtp = await this.otpService.verify({
        email: payload.email,
        type: EtypeOtp.VALIDATE_ACCOUNT,
        value: payload.otp,
      })

      if (!existOtp || GENERATE_MINUTES(existOtp.createdAt) > 10)
        return response.notFound({
          status: false,
          message: 'otp expiré ',
        })
      const existUser = await this.userService.findOne({ key: 'email', value: existOtp.email })
      if (!existUser) {
        return response.notFound({
          status: false,
          message: 'probleme de validation de compte ',
        })
      }
      const user = await this.userService.update(existUser.id!, { status: true })
      // generate token
      const token = await auth.use('api').generate(existUser!)
      //  return data

      return response.ok({
        status: true,
        message: 'connected',
        data: {
          user: user,
          token,
        },
      })
    } catch (error) {
      Logger.error(error)
    }
  }

  public async getOpt({ request, response }: HttpContextContract) {
    const payload = await request.validate({
      schema: this.getOtpValidator,
    })
    try {
      const existUser = await this.userService.findOne({ key: 'email', value: payload.email })
      if (!existUser)
        return response.notFound({
          status: false,
          message: 'Aucun utilisateur avec ce mail',
          data: null,
        })
      // send otp to user
      await this.otpService.get({
        email: existUser.email,
        type: EtypeOtp.RESET_PASSWORD,
      })

      return response.ok({
        status: true,
        message: 'otp envoye',
      })
    } catch (error) {
      return response.expectationFailed({
        status: false,
        message: 'internal server error',
      })
    }
  }

  public async getTokenToResetPassword({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate({
      schema: this.validateOtpValidator,
    })
    try {
      // get otp
      const existOtp = await this.otpService.verify({
        email: payload.email,
        type: EtypeOtp.RESET_PASSWORD,
        value: payload.otp,
      })

      if (!existOtp || GENERATE_MINUTES(existOtp.createdAt) > 10)
        return response.notFound({
          status: false,
          message: 'otp expiré ',
        })
      const user = await this.userService.findOne({
        key: 'email',
        value: payload.email,
      })

      const token = await auth.use('api').generate(user!, { expiresIn: '10 mins' })
      return response.ok({
        status: true,
        data: {
          token,
        },
      })
    } catch (error) {
      Logger.error(error.message)
      return response.expectationFailed({
        status: false,
        data: null,
        message: 'internal error',
      })
    }
  }

  public async resetPassword({ request, response, auth }: HttpContextContract) {
    //1
    const payload = await request.validate({ schema: this.resetPasswordValidator })

    try {
      const user = auth.use('api').user!
      await this.userService.update(user?.id, {
        password: await Hash.make(payload.password),
      })

      auth.logout()
      return response.ok({
        status: false,
        message: 'mot de passe initialisé',
      })
    } catch (error: any) {
      Logger.error(error.message)
      return response.expectationFailed({
        status: false,
        data: null,
        message: 'internal error',
      })
    }
  }
}
