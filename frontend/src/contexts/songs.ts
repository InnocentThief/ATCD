import { makeAutoObservable, reaction } from 'mobx'
import { parseArray } from '../helpers/model'
import { SongOverviewDetailDto } from '../models/SongOverviewDetailDto'
import { SongOverviewDto } from '../models/SongOverviewDto'
import { AuthContext } from './auth'

export class SongContext{

    loadedSongs: SongOverviewDto[] = []
    loadingSongs = false

    loadedSongDetail?: SongOverviewDetailDto

    constructor(private auth: AuthContext){
        makeAutoObservable(this)
    }

    fetchSongs = async () => {
        this.loadingSongs = true
        try {
            const response = await this.auth.fetch(
                `/api/songs`
            )
            const json = await response.json()
            this.loadedSongs = parseArray(json, SongOverviewDto.fromJSON)
            console.log(this.loadedSongs.length)
        } catch (e) {
            this.loadedSongs = []            
        } finally{
            this.loadingSongs = false
        }
    }

    fetchSongDetail = async (songKey: number) => {
        try {
            const response = await this.auth.fetch(
                `/api/songs/${songKey}`
            )
            const json = await response.json()
            this.loadedSongDetail = SongOverviewDetailDto.fromJSON(json)
        } catch (e) {
            return
        }
    }
}