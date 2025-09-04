import { useProtectedPage } from "@/features/auth"
import { ROUTES } from "@/shared/lib"
import { ServicesList } from "@/widgets"
import { Heading, Stack } from "@chakra-ui/react"
import { Outlet } from "react-router"

export default function Dashboard() {
  useProtectedPage(ROUTES.LOGIN)

  return (
    <Stack justify={"center"} as={"section"} gap={4}>
      <Heading as={"h1"} textAlign={"center"} size={"2xl"}>
        Панель управления
      </Heading>

      <ServicesList withFeatures clickableCard={false} title="Услуги" />
      <Outlet />
    </Stack>
  )
}
