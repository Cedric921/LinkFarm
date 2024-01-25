import User from 'App/Models/User'
import Wallet from 'App/Models/Wallet'
import * as i from 'interfaces'

export class UserService {
  public async signing(payload: i.Ilogin): Promise<User | null> {
    return await User.query()
      .if(payload.email, (authQuery) => {
        authQuery.where('email', payload.email!)
      })
      .if(payload.number, (authQuery) => {
        authQuery.where('number', payload.number!)
      })
      .preload('article')
      .preload('role')
      .preload('wallet')
      .first()
  }

  public async findMany(params: i.IuserQuery): Promise<User[] | null> {
    return (
      User.query()
        // .where("enterprise_id", params?.enterprise_id!)
        .whereIn('type', params.type!)
        .preload('article')
        .preload('role')
        .preload('wallet')
        .if(!params.isAdminUser!, (q) => q.where('status', true))
        .orderBy(params.orderBy!, 'desc')
        .paginate(params.offset, params.limit)
    )
  }

  public async findOne(params: i.Ifind) {
    return await User.query()
      .where(params.key, params.value)
      .preload('article')
      .preload('role')
      .preload('wallet')
      .preload('operations', (op) => op.preload('article'))
      .preload('childs')
      .first()
  }

  public async update(id: string, input: object): Promise<User | null> {
    return await User.query().where('id', id).update(input, ['*']).first()
  }

  /**
   *  W A L L E T
   */
  public async findWallets(params: i.IwalletQuery): Promise<Wallet[] | null> {
    return (
      Wallet.query()
        // .where("enterprise_id", params?.enterprise_id!)
        .if(params.type, (q) => {
          q.where('type', params.type!)
        })
        .if(params.number, (q) => {
          q.where('number', params.number!)
        })
        .preload('user')
        .orderBy(params.orderBy!, 'desc')
        .paginate(params.offset, params.limit)
    )
  }

  public async findWallet(params: i.Ifind) {
    return await Wallet.query().where(params.key, params.value).preload('user').first()
  }

  public async updateWallet(id: string, input: object): Promise<Wallet | null> {
    return await Wallet.query().where('id', id).update(input, ['*']).first()
  }
}
