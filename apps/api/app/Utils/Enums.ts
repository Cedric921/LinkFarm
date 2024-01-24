export enum ETypeUser {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum EtypeOtp {
  RESET_PASSWORD = 0,
  VALIDATE_ACCOUNT = 1,
}

export enum EPermision {
  GET = 'GET',
  post = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum EtypeOperation {
  SALE = 'SALE',
  PURCHASE = 'PURCHASE',
}

export enum EtypeWallet {
  BANK = 'BANK',
  MOBILE_MONEY = 'MOBILE_MONEY',
  CRYPTO = 'CRYPTO',
}

export enum EtypeTransaction {
  WITHDRAW = 'WITHDRAW',
  DEPOSIT = 'DEPOSIT',
}
