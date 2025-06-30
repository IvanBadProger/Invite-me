import type { Service } from "@/entities/service"
import { Button } from "@chakra-ui/react"
import { useServiceDelete } from "../model/useServiceDelete"

type ServiceDeleteButtonProps = {
  id: Service["id"]
}

export const ServiceDeleteButton = (
  props: ServiceDeleteButtonProps
) => {
  const { id } = props
  const { isLoading, onDelete } = useServiceDelete()

  const onClick = () => {
    onDelete(id)
  }

  return (
    <Button onClick={onClick} loading={isLoading}>
      Удалить
    </Button>
  )
}
