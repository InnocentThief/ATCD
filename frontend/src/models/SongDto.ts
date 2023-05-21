import {
  logTypeMissmatch,
  parseArray,
  parseBoolean,
  parseNumber,
  parseString,
} from '../helpers/model'
import { ChoreographyDto } from './ChoreographyDto'

export class SongDto {
  title: string = ''
  artist: string = ''
  genreKey: number = 1
  description: string = ''
  previewURL: string = ''
  explicit: boolean = false
  challenge: boolean = false
  contentStrike: boolean = false
  choreographies: ChoreographyDto[] = []

  static fromJSON(obj: any): SongDto {
    if (!obj) {
      logTypeMissmatch(`SongDto`, obj)
      return new SongDto()
    }

    return {
      title: parseString(obj.title),
      artist: parseString(obj.artist),
      genreKey: parseNumber(obj.genreKey),
      description: parseString(obj.description),
      previewURL: parseString(obj.previewURL),
      explicit: parseBoolean(obj.explicit),
      challenge: parseBoolean(obj.challenge),
      contentStrike: parseBoolean(obj.contentStrike),
      choreographies: parseArray(obj.choreographies, ChoreographyDto.fromJSON),
    }
  }
}
