import axios from "axios"
import { STATUS_CODES } from "../api"
import { BASE_API_URL } from "../lib"
import { ToasterService } from "../lib/toaster.service"
import { TokenService } from "./token.service"

const CONTENT_TYPES = {
  json: "application/json",
  formData: "multipart/form-data",
} as const

export class ApiService {
  protected tokenService = new TokenService()
  protected toasterService = new ToasterService()

  protected getHeaders = (
    contentType: keyof typeof CONTENT_TYPES = "json"
  ) => {
    return {
      "Content-Type": CONTENT_TYPES[contentType],
      Accept: "application/json",
    }
  }

  protected baseAxiosInstance = axios.create({
    baseURL: BASE_API_URL,
    headers: this.getHeaders(),
  })

  // public toast = (message: React.ReactNode) => {
  //   this.toasterService.toast(message)
  // }

  constructor() {
    console.log(this.tokenService.getToken())

    this.baseAxiosInstance.interceptors.request.use((req) => {
      if (this.tokenService.hasToken()) {
        req.headers.Authorization = `Bearer ${this.tokenService.getToken()}`
      }

      return req
    })

    this.baseAxiosInstance.interceptors.response.use(
      (res) => {
        return res
      },
      (err) => {
        if (axios.isAxiosError(err)) {
          // fix: почему вообще эта ошибка вылазиет при перезагрузке
          if (err.code === "ERR_CANCELED") {
            return err
          }

          switch (err.status) {
            case STATUS_CODES.UNPROCESSABLE_ENTITY: {
              this.toasterService.toastApiErrors(err.response?.data)
              break
            }

            default: {
              console.error(err)
              this.toasterService.toast(
                `Произошла ошибка. Попробуйте еще раз`,
                { type: "error" }
              )

              break
            }
          }

          return err
        }

        return err
      }
    )
  }
}
