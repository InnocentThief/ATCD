import { makeAutoObservable } from 'mobx'
import { parseString } from '../helpers/model'
import * as toaster from '../helpers/toaster'
import { LoginDto } from '../models/LoginDto'

const TOKEN_STORAGE_KEY = 'auth-token'
const LOGIN_ERROR_TOAST_ID = 'LOGIN_ERROR_TOAST_ID'

export class AuthContext {
  authToken: string | null = null

  constructor() {
    makeAutoObservable(this)
  }

  fetch = async (
      url: string,
      init?: RequestInit | undefined,
      handleError = true
    ) => {
      let headers: Headers
      if (init && init.headers) {
        headers = new Headers(init.headers)
      } else {
        headers = new Headers()
      }
      headers.append('content-type', 'application/json')
      headers.append('pragma', 'no-cache')
      headers.append('cache-control', 'no-cache')
  
      if (this.authToken) {
        headers.append('JWTToken', this.authToken)
      }
  
      try {
        const response = await fetch(url, { ...init, headers: headers })
        if (!response.ok && handleError) {
          toaster.error(`Fehler bei der Server-Anfrage aufgetreten`, {
            details: `${response.statusText} (${response.status}): ${
              init ? init.method : 'GET'
            } ${response.url}`
          })
        }
        return response
      } catch (error) {
        toaster.error(`Fehler bei der Server-Anfrage aufgetreten`, {
          details: error
        })
        throw error
      }
    }

  login = async(loginDto: LoginDto): Promise<void> => {
    const response = await this.fetch(
      `/api/account`,
      {
        method: 'POST',
        body: JSON.stringify(loginDto)
      },
      false
    )

    if (response.status === 401) {
      toaster.dismiss(LOGIN_ERROR_TOAST_ID)
      toaster.error("Benutzername oder Passwort nicht korrekt", {
        toastId: LOGIN_ERROR_TOAST_ID
      })
      throw Error(response.statusText)
    } else if (!response.ok) {
      toaster.dismiss(LOGIN_ERROR_TOAST_ID)
      toaster.error("Fehler bei der Server-Anfrage aufgetreten", {
        toastId: LOGIN_ERROR_TOAST_ID
      })
      throw Error(response.statusText)
    }
    toaster.dismiss(LOGIN_ERROR_TOAST_ID)
    this.handleTokenResponse(response)
  }

  logout = (): void => {
    toaster.dismissAll()
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    window.location.href = '/'
  }

  private handleTokenResponse = async (response: Response) => {
    const token = parseString(await response.json())

    if (token) {
      this.authToken = token
      localStorage.setItem(TOKEN_STORAGE_KEY, token)
    }
  }
}