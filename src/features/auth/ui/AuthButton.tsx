import { ROUTES } from "@/shared/lib"
import { Button } from "@chakra-ui/react"
import { useNavigate } from "react-router"
import { useLogout } from "../model/useLogout"

export const AuthButton = () => {
  const { isAuth, logout } = useLogout()
  const navigate = useNavigate()

  const onClick = isAuth ? () => logout() : () => navigate(ROUTES.LOGIN)

  return (
    <Button variant={isAuth ? "outline" : "solid"} onClick={onClick}>
      {isAuth ? "Выйти" : "Войти"}
    </Button>
  )
}
