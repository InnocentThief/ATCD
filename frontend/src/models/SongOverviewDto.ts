import { logTypeMissmatch, parseArray, parseNumber, parseString } from '../helpers/model'
import { SongOverviewChoreographyDto } from './SongOverviewChoreographyDto'

export class SongOverviewDto {
    songKey: number = 0
    title: string = ''
    artist: string = ''
    coverUrl: string = ''
    avgBpm: string = ''
    genre: string = ''
    length: string = ''
    authorKey: number =0
    author: string = ''
    released: string = ''
    choreographies: SongOverviewChoreographyDto[] = []

    static fromJSON(obj: any): SongOverviewDto {
        if (!obj) {
            logTypeMissmatch(`SongOverviewDto`, obj)
            return new SongOverviewDto()
        }

        return {
            songKey: parseNumber(obj.songKey),
            title: parseString(obj.title),
            artist: parseString(obj.artist),
            coverUrl: parseString(obj.coverUrl),
            avgBpm: parseString(obj.avgBpm),
            genre: parseString(obj.genre),
            length: parseString(obj.length),
            authorKey: parseNumber(obj.authorKey),
            author: parseString(obj.author),
            released: parseString(obj.released),
            choreographies :parseArray(obj.choreographies, SongOverviewChoreographyDto.fromJSON)
        }
    }
}