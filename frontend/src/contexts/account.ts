import { makeAutoObservable } from "mobx";
import { parseArray } from "../helpers/model";
import { AuthorOverviewDto } from "../models/AuthorOverviewDto";
import { AuthContext } from "./auth";

export class AccountContext {
    loadedAuthors: AuthorOverviewDto[] = []
    loadingAuthors = false

    constructor(private auth: AuthContext) {
        makeAutoObservable(this)
    }

    fetchAuthors = async () => {
        this.loadingAuthors = true
        try {
            const response = await this.auth.fetch(
                `/api/account/${this.auth?.currentAccount?.accountKey}/authors`
            )
            const json = await response.json()
            this.loadedAuthors = parseArray(json, AuthorOverviewDto.fromJSON)
        } catch (error) {
            this.loadedAuthors = []
        } finally {
            this.loadingAuthors = false
        }
    }
}