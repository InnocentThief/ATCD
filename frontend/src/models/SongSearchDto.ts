export class SongSearchDto {
  searchText: string = ''
  page: number = 1
  itemsPerPage: number = 50
  choreoExcludes: number[] = []
  genres: number[] = []
  choreoTypes: number[] = []
  publishedFrom: Date | null | undefined
  publishedTo: Date | null | undefined
}
