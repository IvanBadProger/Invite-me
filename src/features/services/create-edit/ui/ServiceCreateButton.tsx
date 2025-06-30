import { Button } from "@chakra-ui/react"
import { Link } from "react-router"

//fix: сделать сохранение состояния формы в стораж
export const ServiceCreateButton = () => {
  return (
    <Button type={undefined} asChild>
      <Link to={"/dashboard/services-create"}>Создать услугу</Link>
    </Button>
  )
}
