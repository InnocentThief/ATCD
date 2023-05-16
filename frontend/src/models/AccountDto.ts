import { logTypeMissmatch, parseNumber, parseString } from '../helpers/model'

export class AccountDto {
  accountKey: number = 0
  username: string = ''
  email: string = ''

  static fromJSON(obj: any): AccountDto {
    if (!obj) {
      logTypeMissmatch(`AccountDto`, obj)
      return new AccountDto()
    }

    return {
      accountKey: parseNumber(obj.accountKey),
      username: parseString(obj.username),
      email: parseString(obj.email),
    }
  }
}
