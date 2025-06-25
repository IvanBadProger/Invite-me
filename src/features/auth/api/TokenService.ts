import { TOKEN_EXPIRATION_DAYS } from "@/shared/lib"
import Cookies from "js-cookie"

export class TokenService {
  private readonly COOKIE_KEY = "TOKEN"

  constructor() {}

  public setToken(token: string) {
    console.log(token)
    Cookies.set(this.COOKIE_KEY, token, {
      expires: TOKEN_EXPIRATION_DAYS,
    })
  }

  public getToken(): string | undefined {
    return Cookies.get(this.COOKIE_KEY)
  }

  public removeToken(): void {
    Cookies.remove(this.COOKIE_KEY)
  }

  public hasToken(): boolean {
    return !!Cookies.get(this.COOKIE_KEY)
  }
}
