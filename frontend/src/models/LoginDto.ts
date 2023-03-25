import { logTypeMissmatch, parseString } from "../helpers/model"

export class LoginDto {
    username: string = ''
    password: string = ''

    static fromJSON(obj: any): LoginDto {
        if (!obj) {
            logTypeMissmatch(`LoginDto`, obj)
            return new LoginDto()
        }
        
        return {
            username: parseString(obj.username),
            password: parseString(obj.password)
        }
    }
}