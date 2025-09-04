import { ApiService, STATUS_CODES } from "@/shared/api"
import axios, { type AxiosResponse } from "axios"
import type {
  CommonServiceOptions,
  Service,
  ServiceCreate,
  ServiceEdit,
  ServiceReduced,
} from "../model"

class ServicesService extends ApiService {
  private readonly ADMIN_PREFIX = "/admin/services"
  private readonly BASE_SERVICES_PATH = "/services"
  public readonly QUERY_KEY = "service"

  constructor() {
    super()
    this.baseAxiosInstance.interceptors.response.use((res) => res, this.handleError)
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

  public async getAll({ isAdmin }: CommonServiceOptions = {}, meta?: { signal: AbortSignal }) {
    const endpoint = isAdmin ? `${this.ADMIN_PREFIX}` : this.BASE_SERVICES_PATH
    return await this.baseAxiosInstance.get<{
      data: ServiceReduced[]
    }>(endpoint, { ...meta })
  }

  public async getById(
    id: Service["id"],
    { isAdmin }: CommonServiceOptions = {}
  ): Promise<Service> {
    const endpoint = isAdmin ? `${this.ADMIN_PREFIX}` : this.BASE_SERVICES_PATH
    const { data } = await this.baseAxiosInstance.get<{ data: Service }>(`${endpoint}/${id}`)
    return data.data
  }

  public async create(payload: ServiceCreate): Promise<Service> {
    const { data } = await this.baseAxiosInstance.post<{ data: Service }>(
      `${this.ADMIN_PREFIX}/add`,
      payload
    )
    return data.data
  }

  public async delete(id: Service["id"]): Promise<void> {
    await this.baseAxiosInstance.delete(`${this.ADMIN_PREFIX}/${id}/delete`)
  }

  public async update(id: Service["id"], data: ServiceEdit): Promise<Service> {
    const response = await this.baseAxiosInstance.patch<{ data: Service }>(
      `${this.ADMIN_PREFIX}/${id}/update`,
      data
    )
    return response.data.data
  }

  public async uploadPhoto(id: Service["id"], formData: FormData): Promise<AxiosResponse> {
    return this.baseAxiosInstance.post(`${this.ADMIN_PREFIX}/${id}/photo/upload`, formData, {
      headers: this.getHeaders("formData"),
    })
  }

  public async deletePhoto(id: Service["id"]): Promise<void> {
    await this.baseAxiosInstance.delete(`${this.ADMIN_PREFIX}/${id}/photo/delete`)
  }
}

export const serviceService = new ServicesService()
