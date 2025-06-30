import { MESSAGES } from "@/shared/lib"
import { z } from "zod"

const serviceTypeSchema = z.union([
  z.literal("basic"),
  z.literal("additional"),
])

export const serviceSchema = z.object({
  id: z.string().nonempty(),
  title: z
    .string({ required_error: MESSAGES.REQUIRED_FIELD })
    .trim()
    .nonempty(),
  description: z.string().trim().nullable().optional(),
  price: z
    .string()
    .nonempty("Введите цену")
    .refine(
      (val) => {
        const valueAsNumber = parseFloat(val)
        return !isNaN(valueAsNumber) && valueAsNumber > 0
      },
      {
        message: "Значение должно быть корректным числом больше 0",
      }
    )
    .transform((val) => parseFloat(val).toFixed(2)),
  type: serviceTypeSchema,
  workTime: z.string().optional(),
  photo_url: z.string().optional(),
  archived: z.boolean().optional(),
})

export const serviceReducedSchema = serviceSchema.omit({
  description: true,
})

export const serviceCreateSchema = serviceSchema.omit({
  id: true,
  photo_url: true,
})

export const ServiceEditSchema = serviceCreateSchema.partial()

export type Service = z.infer<typeof serviceSchema>
export type ServiceReduced = z.infer<typeof serviceReducedSchema>
export type ServiceCreate = z.infer<typeof serviceCreateSchema>
export type ServiceEdit = z.infer<typeof ServiceEditSchema>

export type CommonServiceOptions = Partial<{
  isAdmin: boolean
}>

export type ServiceType = z.infer<typeof serviceTypeSchema>
