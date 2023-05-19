import {
  logTypeMissmatch,
  parseArray,
  parseBoolean,
  parseNumber,
  parseString,
} from '../helpers/model'
import { SongOverviewChoreographyDto } from './SongOverviewChoreographyDto'

export class SongOverviewDto {
  songKey: number = 0
  atr: string = ''
  title: string = ''
  artist: string = ''
  coverUrl: string = ''
  avgBpm: string = ''
  genreKey: number = 0
  genre: string = ''
  length: string = ''
  authorKey: number = 0
  author: string = ''
  released: string = ''
  description: string = ''
  previewURL: string = ''
  explicit: boolean = false
  contentStrike: boolean = false
  challenge: boolean = false
  choreographies: SongOverviewChoreographyDto[] = []

  static fromJSON(obj: any): SongOverviewDto {
    if (!obj) {
      logTypeMissmatch(`SongOverviewDto`, obj)
      return new SongOverviewDto()
    }

    return {
      songKey: parseNumber(obj.songKey),
      atr: parseString(obj.atr),
      title: parseString(obj.title),
      artist: parseString(obj.artist),
      coverUrl: parseString(obj.coverUrl),
      avgBpm: parseString(obj.avgBpm),
      genreKey: parseNumber(obj.genreKey),
      genre: parseString(obj.genre),
      length: parseString(obj.length),
      authorKey: parseNumber(obj.authorKey),
      author: parseString(obj.author),
      released: parseString(obj.released),
      description: parseString(obj.description),
      previewURL: parseString(obj.previewURL),
      explicit: parseBoolean(obj.explicit),
      contentStrike: parseBoolean(obj.contentStrike),
      challenge: parseBoolean(obj.challenge),
      choreographies: parseArray(
        obj.choreographies,
        SongOverviewChoreographyDto.fromJSON
      ),
    }
  }
}
