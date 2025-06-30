import { ApiService, STATUS_CODES } from "@/shared/api"
import axios from "axios"
import type { CommonServiceOptions } from "../model"
import type {
  Service,
  ServiceCreate,
  ServiceEdit,
  ServiceReduced,
} from "../model/types"

class ServicesService extends ApiService {
  public readonly QUERY_KEY = "service"

  constructor() {
    super()

    this.baseAxiosInstance.interceptors.response.use(
      (res) => res,
      this.handleError
    )
  }

  private handleError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      switch (error.status) {
        case STATUS_CODES.UNAUTHORIZED: {
          this.toasterService.toast("Вы не авторизованы", {
            type: "error",
          })

          break
        }

        default:
          break
      }
    }

    throw error
  }

  public getAll = async (
    { isAdmin }: CommonServiceOptions = {},
    meta?: { signal: AbortSignal }
  ) => {
    const url = isAdmin ? "/admin/services" : "/services"

    const res = await this.baseAxiosInstance.get<{
      data: ServiceReduced[]
    }>(url, { ...meta })

    return res
  }

  public async getById(id: Service["id"]) {
    const url = `admin/services/${id}`

    const res = await this.baseAxiosInstance.get<{ data: Service }>(
      url
    )

    return res.data.data
  }

  public async create(payload: ServiceCreate) {
    const url = "/admin/services/add"

    const res = await this.baseAxiosInstance.post<{ data: Service }>(
      url,
      payload
    )
    return res.data.data
  }

  public async delete(id: Service["id"]) {
    const url = `admin/services/${id}/delete`

    await this.baseAxiosInstance.delete(url)
  }

  public async update(id: Service["id"], data: ServiceEdit) {
    const url = `admin/services/${id}/update`

    const res = await this.baseAxiosInstance.patch(url, data)
    return res.data.data
  }

  public async uploadPhoto(id: Service["id"], formData: FormData) {
    const url = `admin/services/${id}/photo/upload`

    return await this.baseAxiosInstance.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  }

  public async deletePhoto(id: Service["id"]) {
    const url = `admin/services/${id}/photo/delete`

    await this.baseAxiosInstance.delete(url)
  }
}

export const serviceService = new ServicesService()
