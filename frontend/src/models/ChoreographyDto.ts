import { logTypeMissmatch, parseNumber, parseString } from '../helpers/model'

export class ChoreographyDto {
  choreographyType: number = 0
  name: string = ''

  static fromJSON(obj: any): ChoreographyDto {
    if (!obj) {
      logTypeMissmatch(`ChoreographyDto`, obj)
      return new ChoreographyDto()
    }

    return {
      choreographyType: parseNumber(obj.choreographyType),
      name: parseString(obj.name),
    }
  }
}
