import { LoginForm, useAuthNavigate } from "@/features/auth/"
import { ROUTES } from "@/shared/lib"

export default function Login() {
  useAuthNavigate(ROUTES.HOME, { triggerIsAuth: true })

  return (
    <>
      <LoginForm />
    </>
  )
}
