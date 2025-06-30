import { useAuthNavigate } from "@/features/auth"
import { ROUTES } from "@/shared/lib"
import { ServicesList } from "@/widgets"
import { Heading } from "@chakra-ui/react"
import { Outlet } from "react-router"

const Dashboard = () => {
  useAuthNavigate(ROUTES.LOGIN)

  return (
    <>
      <Heading as={"h1"}>Панель управления</Heading>
      <ServicesList />

      <Outlet />
    </>
  )
}

export default Dashboard
