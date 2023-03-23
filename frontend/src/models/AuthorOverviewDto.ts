import { logTypeMissmatch, parseNumber, parseString } from "../helpers/model"

export class AuthorOverviewDto {
    authorKey: number = 0
    displayName: string = ''

    static fromJSON(obj: any): AuthorOverviewDto {
        if (!obj) {
            logTypeMissmatch(`AuthorOverviewDto`, obj)
            return new AuthorOverviewDto()
        }

        return {
            authorKey: parseNumber(obj.authorKey),
            displayName: parseString(obj.displayName)
        }
    }
}