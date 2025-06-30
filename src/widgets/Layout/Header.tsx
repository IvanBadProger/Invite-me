import { AuthButton, useAuth } from "@/features/auth"
import { ROUTES } from "@/shared/lib"
import { Box, Center, Container, Link, Stack } from "@chakra-ui/react"
import { NavLink } from "react-router"

export const AdminLinks = () => {
  return (
    <Stack spaceX={4} direction={"row"} as={"ul"}>
      <Link as={"li"}>
        <NavLink to={ROUTES.HOME}>Главная</NavLink>
      </Link>
      <Link as={"li"}>
        <NavLink to={ROUTES.DASHBOARD}>Панель управления</NavLink>
      </Link>
      <Link as={"li"}>
        <AuthButton />
      </Link>
    </Stack>
  )
}

export const Header = () => {
  const isAuth = useAuth((state) => state.isAuth)
  const isDevelopment = import.meta.env.MODE === "development"
  const isAdminLinksVisible = isDevelopment || isAuth

  return (
    <Container paddingY={4} as={"header"}>
      <Center>
        <Stack direction={"row"} spaceX={16}>
          <Box>INVITE ME</Box>
          {isAdminLinksVisible && <AdminLinks />}
        </Stack>
      </Center>
    </Container>
  )
}
