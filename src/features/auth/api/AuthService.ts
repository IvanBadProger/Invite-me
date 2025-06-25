import { ApiService, STATUS_CODES, type ApiError } from "@/shared/api"
import type { LoginFields, SuccessLoginResponse } from "../model"
import { TokenService } from "./TokenService"
import axios from "axios"
import { toastToMainContainer } from "@/shared/lib"

class AuthService extends ApiService {
  private tokenService = new TokenService()
  private authAxiosInstance = this.baseAxiosInstance.create({
    headers: {
      Authorization: this.tokenService.hasToken()
        ? `Bearer ${this.tokenService.getToken()}`
        : undefined,
    },
  })

  public readonly QUERY_KEY = "auth"

  constructor() {
    super()
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

    // return await this.baseAxiosInstance
    //   .post<SuccessLoginResponse>(url, payload)
    //   .then((res) => {
    //     this.tokenService.setToken(res.data.token)
    //   })
    //   .catch((error) => {
    //     if (axios.isAxiosError(error)) {
    //       const { status } = error

    //       switch (status) {
    //         case STATUS_CODES.UNAUTHORIZED: {
    //           toastToMainContainer("Неверный логин или пароль", {
    //             type: "error",
    //           })
    //           throw error
    //         }

    //         case STATUS_CODES.UNPROCESSABLE_ENTITY: {
    //           const data = error.response
    //             ?.data as ApiError<LoginFields>

    //           Object.values(data.errors).forEach((value) => {
    //             toastToMainContainer(value[0], { type: "error" })
    //           })

    //           throw error
    //         }

    //         default:
    //           break
    //       }
    //     }
    //   })
  }
  handleError(error: unknown): void {
    if (axios.isAxiosError(error)) {
      const { status } = error

      switch (status) {
        case STATUS_CODES.UNAUTHORIZED: {
          toastToMainContainer("Неверный логин или пароль", {
            type: "error",
          })
          throw error
        }

        case STATUS_CODES.UNPROCESSABLE_ENTITY: {
          const data = error.response?.data as ApiError<LoginFields>

          Object.values(data.errors).forEach((messages) => {
            if (messages.length > 0)
              toastToMainContainer(messages[0], { type: "error" })
          })

          throw error
        }

        default: {
          toastToMainContainer(
            "Произошла ошибка. Попробуйте еще раз",
            { type: "error" }
          )

          throw error
        }
      }
    }
  }

  public async logout() {
    const url = "/logout"

    return this.authAxiosInstance
      .delete(url)
      .finally(() => this.tokenService.removeToken())
  }

  public isAuth() {
    return this.tokenService.hasToken()
  }
}

export const authService = new AuthService()
