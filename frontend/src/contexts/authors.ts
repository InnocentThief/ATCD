import { makeAutoObservable } from "mobx";
import { parseArray } from "../helpers/model";
import { AuthorOverviewDto } from "../models/AuthorOverviewDto";
import { AuthContext } from "./auth";

export class AuthorContext{
    
    loadedAuthors: AuthorOverviewDto[] = []
    loadingAuthors = false

    selectedAuthor: AuthorOverviewDto  | null | undefined

    constructor(private auth: AuthContext){
        makeAutoObservable(this)
    }

    fetchAuthors = async () => {
        this.loadingAuthors = true
        this.selectedAuthor = null
        try {
            const response = await this.auth.fetch(
                '/api/authors'
            )
            const json = await response.json()
            this.loadedAuthors = parseArray(json, AuthorOverviewDto.fromJSON)
        } catch (error) {
            this.loadedAuthors = []
        } finally{
            this.loadingAuthors = false
        }
    }

    fetchAuthorDetail = async (authorKey: string) => {
        try {
            const response = await this.auth.fetch(
                `/api/authors/${authorKey}`
            )
            const json = await response.json()
            this.selectedAuthor = AuthorOverviewDto.fromJSON(json)
        } catch (error) {
            
        }
    }
}