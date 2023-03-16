import { configure } from "mobx";
import { AuthContext } from "./auth";
import { LanguageContext } from "./language";
import { MapperContext } from "./mappers";
import { PlaylistContext } from "./playlists";
import { SettingsContext } from "./settings";
import { SongContext } from "./songs";


configure({
    enforceActions: 'never'
})

export interface ContextRoot{
    auth: AuthContext
    settings: SettingsContext
    language: LanguageContext
    songs: SongContext
    mappers: MapperContext
    playlists: PlaylistContext
}

const auth = new AuthContext()
const settings = new SettingsContext()
const language = new LanguageContext()
const songs = new SongContext(auth)
const mappers = new MapperContext()
const playlists = new PlaylistContext()

export const Context: ContextRoot = {
    auth,
    settings,
    language,
    songs,
    mappers,
    playlists
}