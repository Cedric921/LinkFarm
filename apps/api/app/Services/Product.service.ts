import Product from 'App/Models/Product'
import * as i from 'interfaces'

export class ProductService {
  public async findMany(params: i.IProductQuery): Promise<Product[] | null> {
    return Product.query().orderBy(params.orderBy!, 'desc').paginate(params.offset, params.limit)
  }

  public async findOne(params: i.Ifind) {
    return await Product.query().where(params.key, params.value).first()
  }

  public async update(id: string, input: object): Promise<Product | null> {
    return await Product.query().where('id', id).update(input, ['*']).first()
  }
}
