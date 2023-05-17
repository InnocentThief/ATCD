import { makeAutoObservable } from 'mobx'
import { parseArray } from '../helpers/model'
import { SongOverviewDto } from '../models/SongOverviewDto'
import { AuthContext } from './auth'
import { GenreDto } from '../models/GenreDto'

export class GenreContext {
  loadedGenres: GenreDto[] = []
  loadedSongs: SongOverviewDto[] = []
  loadingSongs = false

  constructor(private auth: AuthContext) {
    makeAutoObservable(this)

    this.fetchGenres()
  }

  fetchGenres = async () => {
    try {
      const response = await this.auth.fetch(`api/genres`)
      const json = await response.json()
      this.loadedGenres = parseArray(json, GenreDto.fromJSON)
    } catch (error) {
      this.loadedSongs = []
    }
  }

  fetchLatestSongsByGenre = async (genreKey: string) => {
    this.loadingSongs = true
    try {
      const response = await this.auth.fetch(`/api/genres/${genreKey}/songs`)
      const json = await response.json()
      this.loadedSongs = parseArray(json, SongOverviewDto.fromJSON)
    } catch (error) {
      this.loadedSongs = []
    } finally {
      this.loadingSongs = false
    }
  }
}
