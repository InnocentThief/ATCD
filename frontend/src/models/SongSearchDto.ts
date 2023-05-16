export class SongSearchDto {
  searchText: string = ''
  page: number = 1
  itemsPerPage: number = 50
  publishedFrom: Date | null | undefined
  publishedTo: Date | null | undefined
}
