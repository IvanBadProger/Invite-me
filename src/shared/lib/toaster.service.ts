import { toast, type Id, type ToastContent, type ToastOptions } from "react-toastify"
import type { ApiError } from "../api"
import { MAIN_TOAST_CONTAINER_ID } from "./constants"

type ToastOptionsMain = { containerId: Id }

export class ToasterService {
  private toastContainerId: Id

  constructor(toastContainerId?: Id) {
    this.toastContainerId = toastContainerId ?? MAIN_TOAST_CONTAINER_ID
  }

  public toast = <TData = unknown>(
    content: ToastContent<TData>,
    options?: Omit<ToastOptions<TData>, keyof ToastOptionsMain>
  ) => {
    const defaultOptions: ToastOptionsMain = {
      containerId: this.toastContainerId,
    }

    toast(content, { ...options, ...defaultOptions })
  }

  // public toastApiErrors = <T extends Record<string, unknown>>(data: ApiError<T>) => {
  //   Object.values(data.errors).forEach((messages) => {
  //     if (messages && messages.length > 0) {
  //       this.toast(messages[0], { type: "error" })
  //     }
  //   })
  // }

  private formatApiErrorMessages<T extends Record<string, unknown>>(data: ApiError<T>): string[] {
    return Object.values(data.errors).flatMap((messages) => messages?.[0] ?? [])
  }

  public toastApiErrors<T extends Record<string, unknown>>(data: ApiError<T>) {
    this.formatApiErrorMessages(data).forEach((message) => this.toast(message, { type: "error" }))
  }
}
