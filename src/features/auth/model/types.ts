import { MESSAGES } from "@/shared/lib"
import { z } from "zod"

export const LOGIN_RULES = {
  loginMinLength: 1,
  loginMaxLength: 20,
  passwordMinLength: 1,
}

const { loginMinLength, loginMaxLength, passwordMinLength } =
  LOGIN_RULES

export const loginSchema = z.object({
  login: z
    .string()
    .min(loginMinLength, MESSAGES.MIN_LENGTH(loginMinLength))
    .max(loginMaxLength, MESSAGES.MAX_LENGTH(loginMaxLength)),
  password: z
    .string()
    .min(passwordMinLength, MESSAGES.MIN_LENGTH(passwordMinLength)),
})

export type LoginFields = z.infer<typeof loginSchema>
export type SuccessLoginResponse = { token: string }
