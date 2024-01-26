import { ETypeUser } from 'App/Utils/Enums'

export interface Iquery {
  limit: number
  offset: number
  orderBy?: string
  q?: string
}
export interface Ilogin {
  number?: string
  email?: string
}

export interface Ifind {
  key: string
  value: string
}

export interface IuserQuery extends Iquery {
  status?: boolean
  isAdminUser?: boolean
  type?: ETypeUser[]
}

export interface IProductQuery extends Iquery {
  rotAt?: Date
}

export interface IFamerProductQuery extends Iquery {
  userId?: string
}

export interface IProductionItemQuery extends Iquery {
  productId?: string
}

export interface Imail {
  to: string
  data: object
}
