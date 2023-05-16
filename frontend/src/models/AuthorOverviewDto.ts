import { logTypeMissmatch, parseNumber, parseString } from '../helpers/model'

export class AuthorOverviewDto {
  authorKey: number = 0
  displayName: string = ''
  platformId: string = ''
  accountId: string = ''
  description: string = ''
  FirstPublished: string = ''
  LastPublished: string = ''
  AvgBpm: number = 0
  AvgDuration: string = ''
  TotalSongs: number = 0

  static fromJSON(obj: any): AuthorOverviewDto {
    if (!obj) {
      logTypeMissmatch(`AuthorOverviewDto`, obj)
      return new AuthorOverviewDto()
    }

    return {
      authorKey: parseNumber(obj.authorKey),
      displayName: parseString(obj.displayName),
      platformId: parseString(obj.platformId),
      accountId: parseString(obj.accountId),
      description: parseString(obj.description),
      FirstPublished: parseString(obj.FirstPublished),
      LastPublished: parseString(obj.LastPublished),
      AvgBpm: parseNumber(obj.AvgBpm),
      AvgDuration: parseString(obj.AvgDuration),
      TotalSongs: parseNumber(obj.TotalSongs),
    }
  }
}
