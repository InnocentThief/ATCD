import { makeAutoObservable } from "mobx";
import { parseArray } from "../helpers/model";
import { SongOverviewDto } from "../models/SongOverviewDto";
import { AuthContext } from "./auth";

export class GenreContext {
  loadedSongs: SongOverviewDto[] = [];
  loadingSongs = false;

  constructor(private auth: AuthContext) {
    makeAutoObservable(this);
  }

  fetchGenres = async () => {};

  fetchLatestSongsByGenre = async (genreKey: string) => {
    this.loadingSongs = true;
    try {
      const response = await this.auth.fetch(`/api/genres/${genreKey}/songs`);
      const json = await response.json();
      this.loadedSongs = parseArray(json, SongOverviewDto.fromJSON);
    } catch (error) {
      this.loadedSongs = [];
    } finally {
      this.loadingSongs = false;
    }
  };
}
