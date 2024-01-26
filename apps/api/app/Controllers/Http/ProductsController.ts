import Logger from '@ioc:Adonis/Core/Logger'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ETypeUser } from 'App/Utils/Enums'
import { inject } from '@adonisjs/core/build/standalone'
import { ProductService } from 'App/Services/Product.service'
import ProductValidator from 'App/Validators/ProductValidator'
import Product from 'App/Models/Product'

@inject()
export default class ProductsController extends ProductValidator {
  constructor(private readonly productService: ProductService) {
    super()
  }
  public async index({ request, response, auth }: HttpContextContract) {
    try {
      const { rotAt, orderBy = 'created_at', offset = 0, limit = 100 } = request.qs()

      const userAuth = auth.use('api').user
      if (!Object.values(ETypeUser).includes(userAuth?.type! as ETypeUser))
        return response.unauthorized({
          status: false,
          message: 'Unauthorized',
        })

      //  LOGIC HERE
      const data = await this.productService.findMany({
        limit,
        orderBy,
        rotAt,
        offset,
      })

      return response.ok({
        status: true,
        data,
      })
    } catch (error) {
      Logger.error(error)
      return response.expectationFailed({
        status: false,
        message: 'An error occured',
      })
    }
  }

  public async show({ request, response, auth }: HttpContextContract) {
    const { id } = await request.validate({
      schema: this.idValidator,
      data: { id: request.param('id') },
    })
    try {
      const userAuth = auth.use('api').user
      if (!Object.values(ETypeUser).includes(userAuth?.type! as ETypeUser))
        return response.unauthorized({
          status: false,
          message: 'Unauthorized',
        })

      //  LOGIC HERE
      const data = await this.productService.findOne({
        key: 'id',
        value: id,
      })
      return response.ok({
        status: true,
        data,
      })
    } catch (error) {
      Logger.error(error)
      return response.expectationFailed({
        status: false,
        message: 'An error occured',
      })
    }
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate({
      schema: this.createValidator,
    })
    try {
      const userAuth = auth.use('api').user
      if (!Object.values(ETypeUser).includes(userAuth?.type! as ETypeUser))
        return response.unauthorized({
          status: false,
          message: 'Unauthorized',
        })

      //  LOGIC HERE
      const data = await Product.create(payload)
      return response.ok({
        status: true,
        data,
      })
    } catch (error) {
      Logger.error(error)
      return response.expectationFailed({
        status: false,
        message: 'An error occured',
      })
    }
  }

  public async update({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate({
      schema: this.createValidator,
    })
    const { id } = await request.validate({
      schema: this.idValidator,
      data: { id: request.param('id') },
    })
    try {
      const userAuth = auth.use('api').user
      if (!Object.values(ETypeUser).includes(userAuth?.type! as ETypeUser))
        return response.unauthorized({
          status: false,
          message: 'Unauthorized',
        })

      //  LOGIC HERE
      const data = await this.productService.update(id, payload)
      return response.ok({
        status: true,
        data,
      })
    } catch (error) {
      Logger.error(error)
      return response.expectationFailed({
        status: false,
        message: 'An error occured',
      })
    }
  }
}
