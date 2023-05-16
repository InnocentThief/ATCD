import { makeAutoObservable } from 'mobx'
import {
  CHOREOGRAPHY_TYPES,
  ChoreographyType,
} from '../components/layouts/ChoreographyTypes'
import { DateRange } from '@blueprintjs/datetime2'
import { CancelablePromise, makeCancelablePromise } from '../helpers/promise'
import { SongContext } from './songs'

export class SongSearchContext {
  searchText: string = ''
  advancedSearchVisible: boolean = false
  choreographyTypes_items: ChoreographyType[] = CHOREOGRAPHY_TYPES
  choreoTypes_selectedItems: ChoreographyType[] = []
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

  updatePublishedRanged = (range: DateRange) => {
    this.published_range = range
  }
}
