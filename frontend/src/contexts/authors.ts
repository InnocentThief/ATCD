import { makeAutoObservable } from "mobx";
import { parseArray } from "../helpers/model";
import { AuthorOverviewDto } from "../models/AuthorOverviewDto";
import { SongOverviewDto } from "../models/SongOverviewDto";
import { AuthContext } from "./auth";

export class AuthorContext {
  loadedAuthors: AuthorOverviewDto[] = [];
  loadingAuthors = false;

  selectedAuthor: AuthorOverviewDto | null | undefined;

  loadingSongs = false;
  loadedSongs: SongOverviewDto[] = [];

  constructor(private auth: AuthContext) {
    makeAutoObservable(this);
  }

  fetchAuthors = async () => {
    this.loadingAuthors = true;
    this.selectedAuthor = null;
    try {
      const response = await this.auth.fetch("/api/authors");
      const json = await response.json();
      this.loadedAuthors = parseArray(json, AuthorOverviewDto.fromJSON);
    } catch (error) {
      this.loadedAuthors = [];
    } finally {
      this.loadingAuthors = false;
    }
  };

  fetchAuthorDetail = async (authorKey: string) => {
    try {
      const response = await this.auth.fetch(`/api/authors/${authorKey}`);
      const json = await response.json();
      this.selectedAuthor = AuthorOverviewDto.fromJSON(json);
    } catch (error) {}
  };

  fetchLatestSongsByAuthor = async (authorKey: string) => {
    this.loadingSongs = true;
    try {
      const response = await this.auth.fetch(`/api/authors/${authorKey}/songs`);
      const json = await response.json();
      this.loadedSongs = parseArray(json, SongOverviewDto.fromJSON);
    } catch (error) {
      this.loadedSongs = [];
    } finally {
      this.loadingSongs = false;
    }
  };
}
