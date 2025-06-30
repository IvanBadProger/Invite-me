import { Select, type Option } from "@/shared/ui"
import { convertToOptions } from "@/shared/ui/Select/convertToOptions"
import type { ServiceType } from "../model"
import { useServices } from "../model/useServices"

type ServicesSelectProps = { type: ServiceType }

export const ServicesSelect = (props: ServicesSelectProps) => {
  const { type } = props
  const { services, isLoading, isEmpty } = useServices()

  const options = services.reduce((acc: Option[], curr) => {
    if (curr.type === type) {
      const item = convertToOptions(curr, {
        labelKey: "title",
        valueKey: "id",
      })

      acc.push(item)
    }

    return acc
  }, [])

  return (
    <Select
      label="Услуга"
      placeholder={isEmpty ? "Услуг нет" : "Выберите услугу"}
      options={options}
      isLoading={isLoading}
    />
  )
}
