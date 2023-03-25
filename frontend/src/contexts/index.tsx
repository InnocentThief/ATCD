import { configure } from "mobx";
import { AuthContext } from "./auth";
import { LanguageContext } from "./language";
import { AuthorContext } from "./authors";
import { PlaylistContext } from "./playlists";
import { SettingsContext } from "./settings";
import { SongContext } from "./songs";
import { AccountContext } from "./account";


configure({
    enforceActions: 'never'
})

export interface ContextRoot{
    auth: AuthContext
    account: AccountContext
    settings: SettingsContext
    language: LanguageContext
    songs: SongContext
    authors: AuthorContext
    playlists: PlaylistContext
}

const auth = new AuthContext()
const account = new AccountContext(auth)
const settings = new SettingsContext()
const language = new LanguageContext()
const songs = new SongContext(auth)
const authors = new AuthorContext(auth)
const playlists = new PlaylistContext()

export const Context: ContextRoot = {
    auth,
    account,
    settings,
    language,
    songs,
    authors,
    playlists
}