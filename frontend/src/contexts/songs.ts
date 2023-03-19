import { makeAutoObservable, reaction } from 'mobx'
import { parseArray } from '../helpers/model'
import { SongOverviewDto } from '../models/SongOverviewDto'
import { AuthContext } from './auth'

export class SongContext{

    loadedSongs: SongOverviewDto[] = []
    loadingSongs = false

    selectedSong: SongOverviewDto | null | undefined

    constructor(private auth: AuthContext){
        makeAutoObservable(this)
    }

    fetchSongs = async () => {
        this.loadingSongs = true
        this.selectedSong = null
        try {
            const response = await this.auth.fetch(
                `/api/songs`
            )
            const json = await response.json()
            this.loadedSongs = parseArray(json, SongOverviewDto.fromJSON)
        } catch (e) {
            this.loadedSongs = []            
        } finally{
            this.loadingSongs = false
        }
    }

    fetchSongDetail = async (songKey: string) => {
        try {
            const response = await this.auth.fetch(
                `/api/songs/${songKey}`
            )
            const json = await response.json()
            this.selectedSong = SongOverviewDto.fromJSON(json)
        } catch (e) {
            return
        }
    }
}