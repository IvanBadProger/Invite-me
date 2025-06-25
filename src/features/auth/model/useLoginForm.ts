import { useForm } from "react-hook-form"
import { loginSchema, type LoginFields } from "."
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import { ROUTES } from "@/shared/lib"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authService } from "../api/AuthService"
import { useAuth } from "./useAuth"

export const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFields>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
  })

  const { isAuth, setIsAuth } = useAuth()
  const navigate = useNavigate()

  const queryClient = useQueryClient()
  const loginMutation = useMutation({
    mutationFn: (variables: LoginFields) =>
      authService.login(variables),
    retry: false,
    onSettled() {
      queryClient.invalidateQueries({
        queryKey: [authService.QUERY_KEY],
      })
      console.log("dfgkdl")
    },
    onSuccess() {
      setIsAuth(true)
    },
  })

  useEffect(() => {
    if (isAuth) {
      navigate(ROUTES.HOME)
    }
  }, [isAuth, navigate])

  const onSubmit = (data: LoginFields) => {
    loginMutation.mutate(data)
  }

  return {
    isPending: loginMutation.isPending,
    isAuth,
    onSubmit: handleSubmit(onSubmit),
    register,
    formErrors: errors,
  }
}
