import { ROUTES } from "@/shared/lib"
import { Button } from "@chakra-ui/react"
import { useNavigate } from "react-router"
import { useLogout } from "../model/useLogout"

export const AuthButton = () => {
  const { isAuth, logout } = useLogout()
  const navigate = useNavigate()

  if (isAuth) {
    return (
      <Button variant="outline" onClick={() => logout()} size="sm" colorScheme="red">
        Выйти
      </Button>
    )
  }

  return (
    <Button colorScheme="blue" onClick={() => navigate(ROUTES.LOGIN)} size="sm">
      Войти
    </Button>
  )
}
