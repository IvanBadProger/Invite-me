import {
  toast,
  type Id,
  type ToastContent,
  type ToastOptions,
} from "react-toastify"
import type { ApiError } from "../api"
import { MAIN_TOAST_CONTAINER_ID } from "../constants"

type ToastOptionsMain = { containerId: Id }

export class ToasterService {
  private toastContainerId: Id

  constructor(toastContainerId?: Id) {
    this.toastContainerId =
      toastContainerId ?? MAIN_TOAST_CONTAINER_ID
  }

  public toast = <TData = unknown>(
    content: ToastContent<TData>,
    options?: Omit<ToastOptions<TData>, keyof ToastOptionsMain>
  ) => {
    const optionsMain: ToastOptionsMain = {
      containerId: this.toastContainerId,
    }

    toast(content, { ...options, ...optionsMain })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public toastApiErrors = <T extends Record<string, any>>(
    data: ApiError<T>
  ) => {
    Object.values(data.errors).forEach((messages) => {
      if (messages && messages.length > 0)
        this.toast(messages[0], { type: "error" })
    })
  }
}
