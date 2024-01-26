import FarmerProduct from 'App/Models/FarmerProduct'
import ProductionItem from 'App/Models/ProductionItem'
import * as i from 'interfaces'

export class FarmerProductService {
  public async findMany(params: i.IFamerProductQuery): Promise<FarmerProduct[] | null> {
    return FarmerProduct.query()
      .if(params.userId, (q) => q.andWhere('user_id', params.userId!))
      .orderBy(params.orderBy!, 'desc')
      .preload('product')
      .preload('user')
      .paginate(params.offset, params.limit)
  }

  public async findOne(params: i.Ifind) {
    return await FarmerProduct.query()
      .where(params.key, params.value)
      .preload('product')
      .preload('user')
      .first()
  }

  public async update(id: string, input: object): Promise<FarmerProduct | null> {
    return await FarmerProduct.query()
      .where('id', id)
      .update(input, ['*'])
      .preload('product')
      .preload('user')
      .first()
  }

  public async findManyPI(params: i.IProductionItemQuery): Promise<ProductionItem[] | null> {
    return ProductionItem.query()
      .if(params.productId, (q) => q.andWhere('product_id', params.productId!))
      .orderBy(params.orderBy!, 'desc')
      .preload('product', (p) => p.preload('product').preload('user'))
      .paginate(params.offset, params.limit)
  }

  public async findOnePI(params: i.Ifind) {
    return await ProductionItem.query()
      .where(params.key, params.value)
      .preload('product', (p) => p.preload('product').preload('user'))
      .first()
  }
}
