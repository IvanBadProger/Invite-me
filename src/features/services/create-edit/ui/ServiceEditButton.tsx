import { type Service } from "@/entities/service"
import { Button } from "@chakra-ui/react"
import { Link } from "react-router"

type ServiceEditButtonProps = { id: Service["id"] }

export const ServiceEditButton = (props: ServiceEditButtonProps) => {
  const { id } = props

  return (
    <Button type={undefined} asChild>
      <Link to={`/dashboard/services/${id}`}>Редактировать</Link>
    </Button>
  )
}
