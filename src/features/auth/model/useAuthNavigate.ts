import { ROUTES } from "@/shared/lib"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useAuth } from "./useAuth"

type Routes = (typeof ROUTES)[keyof typeof ROUTES]
type UseAuthNavigateOptions = { triggerIsAuth: boolean }

export const useAuthNavigate = (
  route: Routes,
  { triggerIsAuth }: UseAuthNavigateOptions = {
    triggerIsAuth: false,
  }
) => {
  const navigate = useNavigate()
  const isAuth = useAuth((state) => state.isAuth)

  useEffect(() => {
    if (isAuth === triggerIsAuth) {
      navigate(route)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth, navigate, route])
}
