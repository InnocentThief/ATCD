import { makeAutoObservable, reaction } from "mobx";
import { parseString } from "../helpers/model";
import * as toaster from "../helpers/toaster";
import { LoginDto } from "../models/LoginDto";
import jwtDecode from "jwt-decode";
import { TokenDto } from "../models/TokenDto";
import moment from "moment";

const TOKEN_STORAGE_KEY = "auth-token";
const LOGIN_ERROR_TOAST_ID = "LOGIN_ERROR_TOAST_ID";

export class AuthContext {
  refreshTimeoutId: number | null = null;
  authToken: string | null = null;

  constructor() {
    makeAutoObservable(this);

    reaction(() => this.authToken, this.refreshToken);

    this.loadTokenFromStorage();
  }

  get accountKey(): string {
    if (this.authToken) {
      const token = TokenDto.fromJSON(jwtDecode(this.authToken));
      return token.AccountKey;
    }
    return "";
  }

  get isAuthenticated(): boolean {
    return !!this.authToken;
  }

  fetch = async (
    url: string,
    init?: RequestInit | undefined,
    handleError = true
  ) => {
    let headers: Headers;
    if (init && init.headers) {
      headers = new Headers(init.headers);
    } else {
      headers = new Headers();
    }
    headers.append("content-type", "application/json");
    headers.append("pragma", "no-cache");
    headers.append("cache-control", "no-cache");

    if (this.authToken) {
      headers.append("JWTToken", this.authToken);
    }

    try {
      const response = await fetch(url, { ...init, headers: headers });
      if (!response.ok && handleError) {
        toaster.error(`Fehler bei der Server-Anfrage aufgetreten`, {
          details: `${response.statusText} (${response.status}): ${
            init ? init.method : "GET"
          } ${response.url}`,
        });
      }
      return response;
    } catch (error) {
      toaster.error(`Fehler bei der Server-Anfrage aufgetreten`, {
        details: error,
      });
      throw error;
    }
  };

  login = async (loginDto: LoginDto): Promise<void> => {
    const response = await this.fetch(
      `/api/login`,
      {
        method: "POST",
        body: JSON.stringify(loginDto),
      },
      false
    );

    if (response.status === 401) {
      toaster.dismiss(LOGIN_ERROR_TOAST_ID);
      toaster.error("Benutzername oder Passwort nicht korrekt", {
        toastId: LOGIN_ERROR_TOAST_ID,
      });
      throw Error(response.statusText);
    } else if (!response.ok) {
      toaster.dismiss(LOGIN_ERROR_TOAST_ID);
      toaster.error("Fehler bei der Server-Anfrage aufgetreten", {
        toastId: LOGIN_ERROR_TOAST_ID,
      });
      throw Error(response.statusText);
    }
    toaster.dismiss(LOGIN_ERROR_TOAST_ID);
    this.handleTokenResponse(response);
  };

  logout = (): void => {
    toaster.dismissAll();
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    window.location.href = "/songs";
  };

  private getRefreshToken = async (): Promise<void> => {
    try {
      const response = await this.fetch(`/api/login/refresh`, {
        method: "POST",
      });
      if (response.status !== 200) {
        throw new Error();
      }
      this.handleTokenResponse(response);
    } catch (error) {
      this.logout();
      toaster.error("Fehler bei der Authentifizierung. Sie wurden ausgeloggt.");
    }
  };

  private handleTokenResponse = async (response: Response) => {
    const token = parseString(await response.text());

    if (token) {
      this.authToken = token;
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    }
  };

  private get tokenExpiration() {
    if (this.authToken) {
      const token = TokenDto.fromJSON(jwtDecode(this.authToken));
      return moment(token.exp * 1000);
    }
    return null;
  }

  private loadTokenFromStorage = (): void => {
    const tokenString = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!tokenString) {
      return;
    }

    const token = TokenDto.fromJSON(jwtDecode(tokenString));
    const expiration = moment(token.exp * 1000);
    if (expiration && expiration.isAfter()) {
      this.authToken = tokenString;
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  };

  private refreshToken = async () => {
    if (this.refreshTimeoutId) {
      window.clearTimeout(this.refreshTimeoutId);
    }

    if (!this.authToken || !this.tokenExpiration) {
      return;
    }

    this.refreshTimeoutId = window.setTimeout(async () => {
      await this.getRefreshToken();
    }, this.tokenExpiration.valueOf() - moment().valueOf() - 50 * 1000);
  };
}
