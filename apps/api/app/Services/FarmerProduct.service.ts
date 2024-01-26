import FarmerProduct from 'App/Models/FarmerProduct'
import * as i from 'interfaces'

export class FarmerProductService {
  public async findMany(params: i.IFamerProductQuery): Promise<FarmerProduct[] | null> {
    return FarmerProduct.query()
      .if(params.userId, (q) => q.andWhere('user_id', params.userId!))
      .orderBy(params.orderBy!, 'desc')
      .paginate(params.offset, params.limit)
  }

  public async findOne(params: i.Ifind) {
    return await FarmerProduct.query().where(params.key, params.value).first()
  }

  public async update(id: string, input: object): Promise<FarmerProduct | null> {
    return await FarmerProduct.query().where('id', id).update(input, ['*']).first()
  }
}
