import Logger from '@ioc:Adonis/Core/Logger'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ETypeUser } from 'App/Utils/Enums'
import FarmerProductValidator from 'App/Validators/FarmerProductValidator'
import { FarmerProductService } from 'App/Services/FarmerProduct.service'
import FarmerProduct from 'App/Models/FarmerProduct'
import Product from 'App/Models/Product'

export default class FarmerProductsController extends FarmerProductValidator {
  constructor(private readonly fProductService: FarmerProductService) {
    super()
  }
  public async index({ request, response, auth }: HttpContextContract) {
    try {
      const { userId, orderBy = 'created_at', offset = 0, limit = 100 } = request.qs()

      const userAuth = auth.use('api').user
      if (
        !Object.values(ETypeUser)
          .filter((el) => el !== ETypeUser.USER && el !== ETypeUser.ENTERPRISE)
          .includes(userAuth?.type! as ETypeUser)
      )
        return response.unauthorized({
          status: false,
          message: 'Unauthorized',
        })

      //  LOGIC HERE
      const data = await this.fProductService.findMany({
        limit,
        orderBy,
        userId,
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
      const data = await this.fProductService.findOne({
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
      const fProductInput: Partial<FarmerProduct> = {}

      // 1. check user id
      if (
        payload.userId &&
        (userAuth?.type == ETypeUser.ADMIN || userAuth?.type == ETypeUser.SUPER_ADMIN)
      )
        fProductInput.userId = payload.userId
      else if (userAuth?.type == ETypeUser.FARMER) fProductInput.userId = userAuth.id
      else
        return response.unauthorized({
          status: false,
          message: 'Unauthorized',
        })

      // 2. check if product id
      if (payload.productId) fProductInput.productId = payload.productId
      else {
        const product = await Product.create({
          designation: payload.designation,
          description: payload.description,
        })
        fProductInput.productId = product.id
        const data = await FarmerProduct.create(fProductInput)
        return response.created({
          status: true,
          data,
        })
      }

      // save
      const data = await FarmerProduct.create(fProductInput)
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
