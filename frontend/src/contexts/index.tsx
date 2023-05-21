import { configure } from 'mobx'
import { AuthContext } from './auth'
import { LanguageContext } from './language'
import { AuthorContext } from './authors'
import { PlaylistContext } from './playlists'
import { SettingsContext } from './settings'
import { SongContext } from './songs'
import { AccountContext } from './account'
import { GenreContext } from './genre'
import { SongSearchContext } from './songSearch'
import { SongAddContext } from './songAdd'

configure({
  enforceActions: 'never',
})

export interface ContextRoot {
  auth: AuthContext
  account: AccountContext
  settings: SettingsContext
  language: LanguageContext
  songs: SongContext
  songSearch: SongSearchContext
  songAdd: SongAddContext
  authors: AuthorContext
  playlists: PlaylistContext
  genres: GenreContext
}

const auth = new AuthContext()
const account = new AccountContext(auth)
const settings = new SettingsContext()
const language = new LanguageContext()
const songs = new SongContext(auth)
const songSearch = new SongSearchContext(songs)
const songAdd = new SongAddContext(auth)
const authors = new AuthorContext(auth)
const playlists = new PlaylistContext()
const genres = new GenreContext(auth)

export const Context: ContextRoot = {
  auth,
  account,
  settings,
  language,
  songs,
  songSearch,
  songAdd,
  authors,
  playlists,
  genres,
}
