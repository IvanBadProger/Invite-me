import { ROUTES } from "@/shared/lib"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useAuth } from "./useAuth"

type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]
type ProtectedPageOptions = {
  shouldRedirectWhenAuthenticated: boolean
}

export const useProtectedPage = (
  redirectRoute: AppRoute,
  options: ProtectedPageOptions = { shouldRedirectWhenAuthenticated: false }
) => {
  const navigate = useNavigate()
  const isUserAuthenticated = useAuth((state) => state.isAuth)

  useEffect(() => {
    const shouldRedirect = isUserAuthenticated === options.shouldRedirectWhenAuthenticated
    if (shouldRedirect) {
      navigate(redirectRoute)
    }
  }, [isUserAuthenticated, navigate, redirectRoute, options.shouldRedirectWhenAuthenticated])
}
