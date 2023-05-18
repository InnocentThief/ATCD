import { makeAutoObservable } from 'mobx'
import { parseArray } from '../helpers/model'
import { SongOverviewDto } from '../models/SongOverviewDto'
import { AuthContext } from './auth'
import { SongSearchDto } from '../models/SongSearchDto'

export class SongContext {
  loadedSongs: SongOverviewDto[] = []
  loadingSongs = false

  selectedSong: SongOverviewDto | null | undefined
  latestSongsByMapper: SongOverviewDto[] = []
  latestSongsByGenre: SongOverviewDto[] = []

  constructor(private auth: AuthContext) {
    makeAutoObservable(this)
  }

  fetchSongs = async (songSearchDto: SongSearchDto) => {
    this.loadingSongs = true
    this.selectedSong = null
    try {
      const response = await this.auth.fetch(
        `/api/songs`,
        {
          method: 'POST',
          body: JSON.stringify(songSearchDto),
        },
        false
      )
      const json = await response.json()
      this.loadedSongs = parseArray(json, SongOverviewDto.fromJSON)
    } catch (e) {
      this.loadedSongs = []
    } finally {
      this.loadingSongs = false
    }
  }

  fetchSongDetail = async (songKey: string) => {
    try {
      const response = await this.auth.fetch(`/api/songs/${songKey}`)
      const json = await response.json()
      this.selectedSong = SongOverviewDto.fromJSON(json)
      if (this.selectedSong !== null) {
        await this.fetchLatestSongsByGenre(this.selectedSong.genreKey)
        await this.fetchLatestSongsByMapper(this.selectedSong.authorKey)
      }
    } catch (e) {
      return
    }
  }

  fetchLatestSongsByMapper = async (authorKey: number) => {
    try {
      const response = await this.auth.fetch(`/api/authors/${authorKey}/songs`)
      const json = await response.json()
      this.latestSongsByMapper = parseArray(json, SongOverviewDto.fromJSON)
    } catch (error) {
      this.latestSongsByMapper = []
    }
  }

  fetchLatestSongsByGenre = async (genreKey: number) => {
    try {
      const response = await this.auth.fetch(`/api/genres/${genreKey}/songs`)
      const json = await response.json()
      this.latestSongsByGenre = parseArray(json, SongOverviewDto.fromJSON)
    } catch (error) {
      this.latestSongsByGenre = []
    }
  }
}
