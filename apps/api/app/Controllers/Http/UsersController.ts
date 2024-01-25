import Logger from '@ioc:Adonis/Core/Logger'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UserService } from 'App/Services/User.service'
import { inject } from '@adonisjs/fold'
import { ETypeUser } from 'App/Utils/Enums'
import UserValidator from 'App/Validators/UserValidator'
import User from 'App/Models/User'
import { groupOperation } from 'App/Utils/groupData'

@inject()
export default class UsersController extends UserValidator {
  constructor(private userService: UserService) {
    super()
  }
  public async index({ request, response, auth }: HttpContextContract) {
    try {
      //1
      const {
        offset = 1,
        limit = 100,
        status = true,
        orderBy = 'created_at',
        q = '',
      } = request.qs()

      const userAuth = auth.use('api').user
      if (userAuth?.type === ETypeUser.ADMIN || userAuth?.type === ETypeUser.ADMIN)
        return response.expectationFailed({
          status: false,
        })

      const data = await this.userService.findMany({
        offset,
        limit,
        q,
        status,
        orderBy,
        type: [ETypeUser.ADMIN, ETypeUser.USER],
        isAdminUser: true,
      })
      return response.ok({ status: true, data })
    } catch (error) {
      Logger.error(error)
      return response.expectationFailed({
        status: false,
        message: 'internal server error',
      })
    }
  }

  public async show({ request, response }: HttpContextContract) {
    const { id } = await request.validate({
      schema: this.idValidator,
      data: { id: request.param('id') },
    })
    try {
      //2
      const userFound = await this.userService.findOne({ key: 'id', value: id })
      const userData = userFound?.toJSON()

      const op = groupOperation(userFound?.operations!)
      return response.ok({ status: true, data: { userData, operations: op } })
    } catch (error) {
      Logger.error(error)
      return response.expectationFailed({
        status: false,
        message: 'internal server error',
      })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate({
      schema: this.registerValidator,
    })
    try {
      // type & status
      payload.status = true

      const user = await User.create(payload)

      return response.ok({
        status: true,
        message: 'compte enregistré',
        data: user,
      })
    } catch (error) {
      return response.expectationFailed({
        status: false,
        message: 'internal server error',
      })
    }
  }

  /**
   * @update
   * @requestBody {"foo": "bar"}
   * @responseBody 200 <User>
   * @responseBody 404 - User not found
   */
  public async update({ response }: HttpContextContract) {
    try {
      return response.ok({
        status: true,
        message: 'connected',
      })
    } catch (error) {
      Logger.error(error)
      return response.expectationFailed({
        status: false,
        message: 'internal server error',
      })
    }
  }

  public async deactive({ request, response }: HttpContextContract) {
    const { id } = await request.validate({
      schema: this.idValidator,
      data: { id: request.param('id') },
    })
    try {
      const user = await this.userService.update(id, { status: false })
      return response.ok({
        status: true,
        message: `${user?.email} desactivé`,
      })
    } catch (error) {
      Logger.error(error)
      return response.expectationFailed({
        status: false,
        message: 'internal server error',
      })
    }
  }

  public async active({ request, response }: HttpContextContract) {
    const { id } = await request.validate({
      schema: this.idValidator,
      data: { id: request.param('id') },
    })
    try {
      const user = await this.userService.update(id, { status: true })
      return response.ok({
        status: true,
        message: `${user?.email} activé`,
      })
    } catch (error) {
      Logger.error(error)
      return response.expectationFailed({
        status: false,
        message: 'internal server error',
      })
    }
  }

  public async assignRole({ request, response, auth }: HttpContextContract) {
    const { id } = await request.validate({
      schema: this.idValidator,
      data: { id: request.param('id') },
    })
    const { id: roleId } = await request.validate({
      schema: this.idRoleValidator,
    })

    try {
      // check permission
      const userAuth = auth.use('api').user
      if (userAuth?.type !== ETypeUser.ADMIN && userAuth?.type !== ETypeUser.SUPER_ADMIN)
        return response.forbidden({
          status: false,
          message: 'You dont have neccessary permission to do this action',
        })

      const user = await this.userService.update(id, { role_id: roleId })
      return response.ok({
        status: true,
        message: ` role assignated to ${user?.email}`,
      })
    } catch (error) {
      Logger.error(error)
      return response.expectationFailed({
        status: false,
        message: 'internal server error',
      })
    }
  }
}
