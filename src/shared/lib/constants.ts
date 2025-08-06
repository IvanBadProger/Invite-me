import type { Service } from "@/entities/service"

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  SERVICES: "dashboard/services",
  SERVICE: (id: Service["id"] = "") => "/service" + "/" + id,
  SERVICES_CREATE: "dashboard/services/create",
  SERVICES_EDIT: "dashboard/services/edit",
} as const

export const MAIN_TOAST_CONTAINER_ID = "main-toast-container-id"
export const MESSAGES = {
  REQUIRED_FIELD: "Это поле обязательно",
  MAX_LENGTH: (value: number) => `Максимальное количество символов: ${value}`,
  MIN_LENGTH: (value: number) => `Минимальное количество символов: ${value}`,
  PHONE_PATTERN: "Номер телефона не соответствует формату: +7XXX-XXX-XX-XX",
  EMAIL_INVALID: "Неверный формат email (должен содержать @ и что-то еще)",
  POSITIVE_FIELD: "Значение поля должно быть больше 0",
  NONNEGATIVE_FIELD: "Значение поля не может быть меньше нуля",
}

export const TOKEN_EXPIRATION_DAYS = import.meta.env.VITE_TOKE_EXPIRATION_DAYS
export const BASE_API_URL = import.meta.env.VITE_API_URL
