import axios, { AxiosError } from "axios"
import { STATUS_CODES, type ApiError } from "."
import { BASE_API_URL } from "../lib"
import { ToasterService } from "../lib/toaster.service"
import { TokenService } from "./token.service"

const CONTENT_TYPES = {
  json: "application/json",
  formData: "multipart/form-data",
} as const

export class ApiService {
  protected readonly tokenService = new TokenService()
  protected readonly toasterService = new ToasterService()
  protected readonly baseAxiosInstance = axios.create({
    baseURL: BASE_API_URL,
    headers: this.getHeaders(),
  })

  constructor() {
    this.setupRequestInterceptor()
    this.setupResponseInterceptor()
  }

  protected getHeaders(contentType: keyof typeof CONTENT_TYPES = "json") {
    return {
      "Content-Type": CONTENT_TYPES[contentType],
      Accept: "application/json",
    }
  }

  private setupRequestInterceptor() {
    this.baseAxiosInstance.interceptors.request.use((req) => {
      if (this.tokenService.hasToken()) {
        req.headers.Authorization = `Bearer ${this.tokenService.getToken()}`
      }
      return req
    })
  }

  private setupResponseInterceptor() {
    this.baseAxiosInstance.interceptors.response.use((res) => res, this.handleErrorMiddleware)
  }

  private handleErrorMiddleware = (err: unknown): unknown => {
    // if (axios.isAxiosError(err)) {
    //   // fix: почему вообще эта ошибка вылазиет при перезагрузке
    //   if (err.code === "ERR_CANCELED") {
    //     return err
    //   }

    //   switch (err.status) {
    //     case STATUS_CODES.UNPROCESSABLE_ENTITY: {
    //       this.toasterService.toastApiErrors(err.response?.data)
    //       break
    //     }

    //     default: {
    //       console.error(err)
    //       this.toasterService.toast(`Произошла ошибка. Попробуйте еще раз`, { type: "error" })

    //       break
    //     }
    //   }

    //   return err
    // }

    if (!axios.isAxiosError(err)) {
      return err
    }

    if (err.code === "ERR_CANCELED") {
      return err
    }

    this.handleErrorByStatus(err)
    return err
  }

  private handleErrorByStatus(error: AxiosError<ApiError<Record<string, string[]>>>) {
    switch (error.status) {
      case STATUS_CODES.UNPROCESSABLE_ENTITY: {
        const data = error.response?.data
        if (data) this.toasterService.toastApiErrors(data)
        break
      }

      default: {
        console.error(error)
        this.toasterService.toast(`Произошла ошибка. Попробуйте еще раз`, { type: "error" })
        break
      }
    }
  }
}
