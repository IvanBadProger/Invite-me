export { ApiService } from "./ApiService"

export const STATUS_CODES = {
  CONTINUE: 100,
  SWITCHING_PROTOCOLS: 101,
  OK: 200,
  CREATED: 201,
  NOT_MODIFIED: 304,
  BAD_REQUEST: 400,
  UNPROCESSABLE_ENTITY: 422,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ApiError<T extends Record<string, any>> = {
  message: string
  errors: Partial<Record<keyof T, string[]>>
}
