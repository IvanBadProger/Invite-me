import { ApiService, STATUS_CODES } from "@/shared/api"
import type {
  LoginFields,
  SuccessLoginResponse,
} from "@/features/auth/model"
import axios from "axios"

class AuthService extends ApiService {
  public readonly QUERY_KEY = "auth"

  constructor() {
    super()
  }

  private handleError(error: unknown): void {
    if (axios.isAxiosError(error)) {
      const { status } = error

      switch (status) {
        case STATUS_CODES.UNAUTHORIZED: {
          this.toasterService.toast("Неверный логин или пароль", {
            type: "error",
          })
          throw error
        }

        default: {
          throw error
        }
      }
    }
  }

  public async login(payload: LoginFields): Promise<void> {
    const url = "/login"

    try {
      const res =
        await this.baseAxiosInstance.post<SuccessLoginResponse>(
          url,
          payload
        )

      this.tokenService.setToken(res.data.token)
    } catch (error) {
      this.handleError(error)
      throw error
    }
  }

  public async logout(): Promise<void> {
    const url = "/logout"

    this.baseAxiosInstance
      .delete(url)
      .finally(() => this.tokenService.removeToken())
  }

  public isAuth() {
    return this.tokenService.hasToken()
  }
}

export const authService = new AuthService()
