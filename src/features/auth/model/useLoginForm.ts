import { ROUTES } from "@/shared/lib"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { loginSchema, type LoginFields } from "."
import { authService } from "../api/auth.service"
import { useAuth } from "./useAuth"

export const useLoginForm = () => {
  const setIsAuth = useAuth((state) => state.setIsAuth)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFields>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
  })

  const loginMutation = useMutation({
    mutationFn: (variables: LoginFields) => authService.login(variables),
    retry: false,
    onSettled() {
      queryClient.invalidateQueries({
        queryKey: [authService.QUERY_KEY],
      })
    },
    async onSuccess() {
      setIsAuth(true)
      await navigate(ROUTES.DASHBOARD)
    },
  })

  const onSubmit = async (data: LoginFields) => {
    loginMutation.mutate(data)
  }

  return {
    isPending: loginMutation.isPending,
    onSubmit: handleSubmit(onSubmit),
    register,
    formErrors: errors,
  }
}
