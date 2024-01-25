import { ETypeUser, EtypeOperation, EtypeTransaction, EtypeWallet } from 'App/Utils/Enums'

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

export interface IwalletQuery extends Iquery {
  number?: string
  type?: EtypeWallet
}

export interface Imail {
  to: string
  data: object
}

//  roles
export interface Irole {
  designation: string
  description?: string
}

export interface IpermissionQuery extends Iquery {
  module: string
}

export interface Ipermission {
  module: string
  designation: string
  description?: string
}

export interface IrolePermissionQuery extends Iquery {
  roleId?: string
}

export interface IrolePermission {
  roleId?: string
  permissionId: string
}

//  Operation

export interface IoperationQuery extends Iquery {
  userId?: string
  articleId?: string
  type?: EtypeOperation
}

// Transaction

export interface ItransactionQuery extends Iquery {
  userId?: string
  articleId?: string
  type?: EtypeTransaction
  isValidate?: boolean
}
