import { MESSAGES } from "@/shared/lib"
import { z } from "zod"

// 1. Базовые схемы валидации -----------------------------------
const nonEmptyString = (message = MESSAGES.REQUIRED_FIELD) =>
  z.string({ required_error: message }).trim().nonempty()

const positiveNumberString = z
  .string()
  .nonempty("Введите цену")
  .refine(
    (val) => {
      const num = parseFloat(val)
      return !isNaN(num) && num > 0
    },
    { message: "Значение должно быть корректным числом больше 0" }
  )
  .transform((val) => parseFloat(val).toFixed(2))

// 2. Типы сервисов ---------------------------------------------
export const SERVICE_TYPES = ["basic", "additional"] as const
export type ServiceType = (typeof SERVICE_TYPES)[number]
const serviceTypeSchema = z.enum(SERVICE_TYPES)

// 3. Основная схема сервиса ------------------------------------
const serviceBaseSchema = {
  id: nonEmptyString(),
  title: nonEmptyString(),
  description: z.string().trim().nullable().optional(),
  price: positiveNumberString,
  type: serviceTypeSchema,
  work_time: z.string().optional(),
  photo_url: z.string().optional(),
  archived: z.boolean().optional(),
}

export const serviceSchema = z.object(serviceBaseSchema)

// 4. Производные схемы -----------------------------------------
export const serviceReducedSchema = serviceSchema.omit({ description: true })
export const serviceCreateSchema = serviceSchema.omit({ id: true, photo_url: true })
export const serviceEditSchema = serviceCreateSchema.partial()

// 5. Экспорт типов ---------------------------------------------
export type Service = z.infer<typeof serviceSchema>
export type ServiceReduced = z.infer<typeof serviceReducedSchema>
export type ServiceCreate = z.infer<typeof serviceCreateSchema>
export type ServiceEdit = z.infer<typeof serviceEditSchema>

// 6. Дополнительные типы ---------------------------------------
export type CommonServiceOptions = Partial<{
  isAdmin: boolean
}>
