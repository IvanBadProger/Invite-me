import { LoginForm, useProtectedPage } from "@/features/auth/"
import { ROUTES } from "@/shared/lib"

export default function Login() {
  useProtectedPage(ROUTES.HOME, { shouldRedirectWhenAuthenticated: true })

  return <LoginForm />
}
