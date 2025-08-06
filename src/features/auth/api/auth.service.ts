import type { LoginFields, SuccessLoginResponse } from "@/features/auth/model"
import { ApiService, STATUS_CODES } from "@/shared/api"
import axios from "axios"

class AuthService extends ApiService {
  public readonly QUERY_KEY = "auth"
  private static readonly LOGIN_PATH = "/login"
  private static readonly LOGOUT_PATH = "/logout"

  constructor() {
    super()
  }

  public async login(payload: LoginFields): Promise<void> {
    try {
      const { data } = await this.baseAxiosInstance.post<SuccessLoginResponse>(
        AuthService.LOGIN_PATH,
        payload
      )
      this.tokenService.setToken(data.token)
    } catch (error) {
      this.handleAuthError(error)
      throw error
    }
  }

  public async logout(): Promise<void> {
    this.baseAxiosInstance
      .delete(AuthService.LOGOUT_PATH)
      .finally(() => this.tokenService.removeToken())
  }

  public isAuthenticated(): boolean {
    return this.tokenService.hasToken()
  }

  private handleAuthError(error: unknown): void {
    if (!axios.isAxiosError(error)) return

    if (error.response?.status === STATUS_CODES.UNAUTHORIZED) {
      this.showInvalidCredentialsToast()
    }
  }

  private showInvalidCredentialsToast(): void {
    this.toasterService.toast("Неверный логин или пароль", {
      type: "error",
    })
  }
}

export const authService = new AuthService()
