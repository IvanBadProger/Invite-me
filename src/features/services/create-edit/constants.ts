import type { ServiceCreate, ServiceType } from "@/entities/service/model"
import type { Option } from "@/shared/ui"

export const LABELS: Record<keyof ServiceCreate, string> = {
  title: "Название",
  description: "Описание",
  price: "Цена",
  work_time: "Приблизительное время работы",
  archived: "Поместить в архив",
  type: "Тип",
} as const

export const TYPES: Option[] = [
  {
    value: "basic",
    label: "Основная",
  },
  {
    value: "additional",
    label: "Дополнительная",
  },
] as const

export const DEFAULT_VALUES = {
  archived: false,
  description: "",
  price: "1000",
  title: "",
  type: TYPES[0].value as ServiceType,
  work_time: "0",
}
