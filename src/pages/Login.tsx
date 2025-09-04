import { LoginForm, useProtectedPage } from "@/features/auth/"
import { ROUTES } from "@/shared/lib"
import { Box } from "@chakra-ui/react"

export default function Login() {
  useProtectedPage(ROUTES.HOME, { shouldRedirectWhenAuthenticated: true })

  return (
    <Box minH="100vh" maxW={"lg"} mx={"auto"} my={8} as={"section"}>
      <LoginForm />
    </Box>
  )
}
