import type { Service } from "@/entities/service"
import { Button } from "@chakra-ui/react"
import { Trash } from "lucide-react"
import { useServiceDelete } from "../model/useServiceDelete"

type ServiceDeleteButtonProps = {
  id: Service["id"]
}

export const ServiceDeleteButton = (props: ServiceDeleteButtonProps) => {
  const { id } = props
  const { isLoading, onDelete } = useServiceDelete()
  const label = "Удалить услугу"

  const onClick = () => {
    onDelete(id)
  }

  return (
    <Button
      size={"xs"}
      variant={"subtle"}
      onClick={onClick}
      loading={isLoading}
      aria-label={label}
      title={label}
      _hover={{
        bgColor: "red.200",
      }}
    >
      <Trash />
    </Button>
  )
}
