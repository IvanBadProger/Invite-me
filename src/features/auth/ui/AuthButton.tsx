import { Button } from "@chakra-ui/react"
import { useNavigate } from "react-router"
import { ROUTES } from "@/shared/lib"
import { useLogout } from "../model/useLogout"

export const AuthButton = () => {
  const { isAuth, logout } = useLogout()
  const navigate = useNavigate()

  const onClick = () => {
    if (isAuth) {
      logout()
    } else {
      navigate(ROUTES.LOGIN)
    }
  }

  return (
    <Button variant={isAuth ? "outline" : "solid"} onClick={onClick}>
      {isAuth ? "Выйти" : "Войти"}
    </Button>
  )
}
