import { makeAutoObservable, reaction } from "mobx";
import { parseArray } from "../helpers/model";
import { AccountDto } from "../models/AccountDto";
import { AuthorOverviewDto } from "../models/AuthorOverviewDto";
import { AuthContext } from "./auth";

export class AccountContext {
  loadingAccount = false;
  currentAccount: AccountDto | null | undefined;

  loadedAuthors: AuthorOverviewDto[] = [];
  loadingAuthors = false;

  constructor(private auth: AuthContext) {
    makeAutoObservable(this);

    reaction(
      () => auth.authToken,
      () => {
        if (auth.isAuthenticated) {
          this.fetchAccount(auth.accountKey);
        }
      }
    );
  }

  fetchAccount = async (accountKey: string) => {
    this.loadingAccount = true;
    console.log("Loading Account");
    try {
      const response = await this.auth.fetch(`/api/accounts/${accountKey}`);
      const json = await response.json();
      this.currentAccount = AccountDto.fromJSON(json);
    } catch (error) {
      console.log("1");
      this.currentAccount = null;
    } finally {
      this.loadingAccount = false;
    }
  };

  fetchAuthors = async () => {
    this.loadingAuthors = true;
    try {
      console.log(this.currentAccount);
      const response = await this.auth.fetch(
        `/api/accounts/${this.currentAccount?.accountKey}/authors`
      );
      const json = await response.json();
      this.loadedAuthors = parseArray(json, AuthorOverviewDto.fromJSON);
    } catch (error) {
      this.loadedAuthors = [];
    } finally {
      this.loadingAuthors = false;
    }
  };
}
