import { logTypeMissmatch, parseNumber, parseString } from "../helpers/model"

export class AuthorOverviewDto {
    authorKey: number = 0
    displayName: string = ''
    platformId: string = ''
    accountId: string = ''
    description: string = ''

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
            description: parseString(obj.description)
        }
    }
}