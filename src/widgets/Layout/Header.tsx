import { AuthButton, useAuth } from "@/features/auth"
import { ROUTES } from "@/shared/lib"
import { Box, Center, Container, Link, Stack } from "@chakra-ui/react"
import { NavLink } from "react-router"

export const AdminLinks = () => {
  return (
    <Stack spaceX={4} direction={"row"} as={"ul"}>
      <Center as="li">
        <Link asChild>
          <NavLink to={ROUTES.HOME}>Главная</NavLink>
        </Link>
      </Center>
      <Center as="li">
        <Link asChild>
          <NavLink to={ROUTES.DASHBOARD}>Панель управления</NavLink>
        </Link>
      </Center>
      <Center as="li">
        <Link asChild>
          <AuthButton />
        </Link>
      </Center>
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
