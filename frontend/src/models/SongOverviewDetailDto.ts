import { logTypeMissmatch, parseNumber, parseString } from '../helpers/model'

export class SongOverviewDetailDto {
    songKey: number = 0
    title: string = ''
    artist: string = ''
    coverUrl: string = ''
    authorKey: number =0
    author: string = ''
    released: string = ''

    static fromJSON(obj: any): SongOverviewDetailDto {
        if (!obj) {
            logTypeMissmatch(`SongOverviewDetailDto`, obj)
            return new SongOverviewDetailDto()
        }

        return {
            songKey: parseNumber(obj.songKey),
            title: parseString(obj.title),
            artist: parseString(obj.artist),
            coverUrl: parseString(obj.coverUrl),
            authorKey: parseNumber(obj.authorKey),
            author: parseString(obj.author),
            released: parseString(obj.released)
        }
    }
}