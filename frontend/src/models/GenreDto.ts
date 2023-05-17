import { logTypeMissmatch, parseNumber, parseString } from '../helpers/model'

export class GenreDto {
  genreKey: number = 0
  displayName: string = ''

  static fromJSON(obj: any): GenreDto {
    if (!obj) {
      logTypeMissmatch(`GenreDto`, obj)
      return new GenreDto()
    }

    return {
      genreKey: parseNumber(obj.genreKey),
      displayName: parseString(obj.displayName),
    }
  }
}
