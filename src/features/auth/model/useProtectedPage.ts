import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useAuth } from "./useAuth"

type ProtectedPageOptions = {
  shouldRedirectWhenAuthenticated: boolean
}

export const useProtectedPage = (
  redirectTo: string,
  options: ProtectedPageOptions = { shouldRedirectWhenAuthenticated: false }
) => {
  const navigate = useNavigate()
  const isUserAuthenticated = useAuth((state) => state.isAuth)

  useEffect(() => {
    const shouldRedirect = isUserAuthenticated === options.shouldRedirectWhenAuthenticated
    if (shouldRedirect) {
      navigate(redirectTo)
    }
  }, [isUserAuthenticated, navigate, redirectTo, options.shouldRedirectWhenAuthenticated])
}
