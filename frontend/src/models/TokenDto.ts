import { logTypeMissmatch, parseNumber, parseString } from '../helpers/model'

export class TokenDto {
  Username: string = ''
  AccountKey: string = ''
  exp: number = 0

  static fromJSON(obj: any): TokenDto {
    if (!obj) {
      logTypeMissmatch('TokenDto', obj)
      return new TokenDto()
    }

    return {
      Username: parseString(obj.Username),
      AccountKey: parseString(obj.AccountKey),
      exp: parseNumber(obj.exp),
    }
  }
}
