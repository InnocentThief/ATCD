import { logTypeMissmatch, parseNumber, parseString } from '../helpers/model'

export class SongOverviewChoreographyDto {
  choreographyKey: number = 0
  id: string = ''
  choreographyTypeId: number = 0
  choreographyType: string = ''
  displayName: string = ''
  gemSpeed: number = 0
  gemRadius: number = 0

  static fromJSON(obj: any): SongOverviewChoreographyDto {
    if (!obj) {
      logTypeMissmatch(`SongOverviewDto`, obj)
      return new SongOverviewChoreographyDto()
    }

    return {
      choreographyKey: parseNumber(obj.choreographyKey),
      id: parseString(obj.id),
      choreographyTypeId: parseNumber(obj.choreographyTypeId),
      choreographyType: parseString(obj.choreographyType),
      displayName: parseString(obj.displayName),
      gemSpeed: parseNumber(obj.gemSpeed),
      gemRadius: parseNumber(obj.gemRadius),
    }
  }
}
