import {
  type Id,
  toast,
  type ToastContent,
  type ToastOptions,
} from "react-toastify"
import { MAIN_TOAST_CONTAINER_ID } from "./constants"

type ToastOptionsMain = { containerId: Id }

export const toastToMainContainer = <TData = unknown>(
  content: ToastContent<TData>,
  options?: Omit<ToastOptions<TData>, keyof ToastOptionsMain>
) => {
  const optionsMain: ToastOptionsMain = {
    containerId: MAIN_TOAST_CONTAINER_ID,
  }

  toast(content, { ...options, ...optionsMain })
}
