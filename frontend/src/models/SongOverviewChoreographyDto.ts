import { logTypeMissmatch, parseNumber, parseString } from '../helpers/model'

export class SongOverviewChoreographyDto {
    displayName: string = ''

    static fromJSON(obj: any): SongOverviewChoreographyDto {
        if (!obj) {
            logTypeMissmatch(`SongOverviewDto`, obj)
            return new SongOverviewChoreographyDto()
        }

        return {
            displayName: parseString(obj.displayName),
        }
    }
}