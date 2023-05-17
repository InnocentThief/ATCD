import { makeAutoObservable } from 'mobx'
import { ChoreographyType } from '../helpers/choreographyTypes'
import { DateRange } from '@blueprintjs/datetime2'
import { CancelablePromise, makeCancelablePromise } from '../helpers/promise'
import { SongContext } from './songs'
import { ChoreographyExclude } from '../helpers/choreographyExcludes'
import { GenreDto } from '../models/GenreDto'

export class SongSearchContext {
  searchText: string = ''
  advancedSearchVisible: boolean = false
  selectedChoreoExcludes: ChoreographyExclude[] = []
  selectedGenres: GenreDto[] = []
  selectedChoreoTypes: ChoreographyType[] = []
  published_range: DateRange = [null, null]
  page: number = 1
  itemsPerPage: number = 50

  searchPromise: CancelablePromise<void> | undefined

  constructor(private songs: SongContext) {
    makeAutoObservable(this)
  }

  search = async (): Promise<void> => {
    const [start, end] = this.published_range
    this.searchPromise = makeCancelablePromise(
      this.songs.fetchSongs({
        searchText: this.searchText,
        page: this.page,
        itemsPerPage: this.itemsPerPage,
        choreoExcludes: this.selectedChoreoExcludes.map(ce => ce.id),
        genres: this.selectedGenres.map(g => g.genreKey),
        choreoTypes: this.selectedChoreoTypes.map(ct => ct.id),
        publishedFrom: start,
        publishedTo: end,
      })
    )
  }

  resetPage = async () => {
    this.page = 1
  }

  previous = async () => {
    if (this.page > 1) {
      this.page = this.page - 1
      this.search()
    }
  }

  next = async () => {
    this.page = this.page + 1
    this.search()
  }

  changeAdvancedSearchVisibleState = () => {
    this.advancedSearchVisible = !this.advancedSearchVisible
  }

  updateSearchText = (searchText: string) => {
    this.searchText = searchText
  }

  clearSelectedChoreoExcludes = () => {
    this.selectedChoreoExcludes = []
  }

  updateSelectedChoreoExcludes = (choreoExcludes: ChoreographyExclude[]) => {
    this.selectedChoreoExcludes = choreoExcludes
  }

  clearSelectedGenres = () => {
    this.selectedGenres = []
  }

  updateSelectedGenres = (genres: GenreDto[]) => {
    this.selectedGenres = genres
  }

  clearSelectedChoreoTypes = () => {
    this.selectedChoreoTypes = []
  }

  updateSelectedChoreoTypes = (choreoTypes: ChoreographyType[]) => {
    this.selectedChoreoTypes = choreoTypes
  }

  updatePublishedRanged = (range: DateRange) => {
    this.published_range = range
  }
}
