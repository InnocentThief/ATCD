import { logTypeMissmatch, parseNumber, parseString } from '../helpers/model'

export class AuthorOverviewDto {
  authorKey: number = 0
  displayName: string = ''
  platformId: string = ''
  accountId: string = ''
  description: string = ''
  firstPublished: string = ''
  lastPublished: string = ''
  avgBpm: number = 0
  avgDuration: string = ''
  totalSongs: number = 0

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
      firstPublished: parseString(obj.firstPublished),
      lastPublished: parseString(obj.lastPublished),
      avgBpm: parseNumber(obj.avgBpm),
      avgDuration: parseString(obj.avgDuration),
      totalSongs: parseNumber(obj.totalSongs),
    }
  }
}
