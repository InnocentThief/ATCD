import { logTypeMissmatch, parseNumber, parseString } from '../helpers/model'

export class SongOverviewChoreographyDto {
    choreographyKey: number = 0
    displayName: string = ''

    static fromJSON(obj: any): SongOverviewChoreographyDto {
        if (!obj) {
            logTypeMissmatch(`SongOverviewDto`, obj)
            return new SongOverviewChoreographyDto()
        }

        return {
            choreographyKey: parseNumber(obj.choreographyKey),
            displayName: parseString(obj.displayName),
        }
    }
}