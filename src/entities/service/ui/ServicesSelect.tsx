import { convertToOptions, Select } from "@/shared/ui"
import { useMemo } from "react"
import type { ServiceType } from "../model"
import { useServices } from "../model/useServices"

type ServicesSelectProps = { type: ServiceType }

export const ServicesSelect = (props: ServicesSelectProps) => {
  const { type } = props
  const { services, isLoading, isEmpty } = useServices()

  const options = useMemo(
    () =>
      // services.reduce((acc: Option[], curr) => {
      //   if (curr.type === type) {
      //     const item = convertToOptions(curr, {
      //       labelKey: "title",
      //       valueKey: "id",
      //     })

      //     acc.push(item)
      //   }

      //   return acc
      // }, []),
      services
        .filter((service) => service.type === type)
        .map((service) =>
          convertToOptions(service, {
            labelKey: "title",
            valueKey: "id",
          })
        ),
    [services, type]
  )

  return (
    <Select
      label="Услуга"
      placeholder={isEmpty ? "Услуг нет" : "Выберите услугу"}
      options={options}
      isLoading={isLoading}
    />
  )
}
