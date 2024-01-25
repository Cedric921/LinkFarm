import User from 'App/Models/User'
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
      .first()
  }

  public async findMany(params: i.IuserQuery): Promise<User[] | null> {
    return (
      User.query()
        // .where("enterprise_id", params?.enterprise_id!)
        .whereIn('type', params.type!)
        .if(!params.isAdminUser!, (q) => q.where('status', true))
        .orderBy(params.orderBy!, 'desc')
        .paginate(params.offset, params.limit)
    )
  }

  public async findOne(params: i.Ifind) {
    return await User.query().where(params.key, params.value).first()
  }

  public async update(id: string, input: object): Promise<User | null> {
    return await User.query().where('id', id).update(input, ['*']).first()
  }
}
