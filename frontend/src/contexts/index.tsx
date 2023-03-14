import { configure } from "mobx";
import { AuthContext } from "./auth";
import { MapperContext } from "./mappers";
import { PlaylistContext } from "./playlists";
import { SongContext } from "./songs";


configure({
    enforceActions: 'never'
})

export interface ContextRoot{
    auth: AuthContext
    songs: SongContext
    mappers: MapperContext
    playlists: PlaylistContext
}

const auth = new AuthContext()
const songs = new SongContext(auth)
const mappers = new MapperContext()
const playlists = new PlaylistContext()

export const Context: ContextRoot = {
    auth,
    songs,
    mappers,
    playlists
}