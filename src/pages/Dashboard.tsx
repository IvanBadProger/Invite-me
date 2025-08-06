import { useProtectedPage } from "@/features/auth"
import { ROUTES } from "@/shared/lib"
import { ServicesList } from "@/widgets"
import { Heading } from "@chakra-ui/react"
import { Outlet } from "react-router"

const Dashboard = () => {
  useProtectedPage(ROUTES.LOGIN)

  return (
    <>
      <Heading as={"h1"}>Панель управления</Heading>
      <ServicesList withFeatures clickableCard={false} />

      <Outlet />
    </>
  )
}

export default Dashboard
