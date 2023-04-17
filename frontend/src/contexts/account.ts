import { makeAutoObservable, reaction } from "mobx";
import { parseArray } from "../helpers/model";
import { AccountDto } from "../models/AccountDto";
import { AuthorOverviewDto } from "../models/AuthorOverviewDto";
import { AuthContext } from "./auth";

export class AccountContext {

    loadingAccount = false
    currentAccount: AccountDto | null | undefined

    loadedAuthors: AuthorOverviewDto[] = []
    loadingAuthors = false

    constructor(private auth: AuthContext) {
        makeAutoObservable(this)

        // TODO: Remove this once login is available !!!!!!!
        this.currentAccount = null
        // this.currentAccount = new AccountDto()
        // this.currentAccount.accountKey = 1
        // this.currentAccount.username = "InnocentThief"
        // this.currentAccount.email = "blubber@emailprovier.com"

        reaction(
            () => auth.authToken,
            () => {
                this.currentAccount = null
            }
        )
    }

    fetchAccount = async (accountKey: string) => {
        this.loadingAccount = true
        try {
            const response = await this.auth.fetch(
                `/api/accounts/${accountKey}`
            )
            const json = await response.json()
            // TODO: Return account dto
        } catch (error) {
            this.currentAccount = null
        } finally {
            this.loadingAccount = false
        }
    }

    fetchAuthors = async () => {
        this.loadingAuthors = true
        try {
            const response = await this.auth.fetch(
                `/api/accounts/${this.currentAccount?.accountKey}/authors`
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