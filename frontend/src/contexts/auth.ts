import * as toaster from '../helpers/toaster'

export class AuthContext {
    authToken: string | null = null

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
}