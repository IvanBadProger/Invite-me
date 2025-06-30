import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { loginSchema, type LoginFields } from "."
import { authService } from "../api/auth.service"
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

  const { setIsAuth } = useAuth()

  const queryClient = useQueryClient()
  const loginMutation = useMutation({
    mutationFn: (variables: LoginFields) =>
      authService.login(variables),
    retry: false,
    onSettled() {
      queryClient.invalidateQueries({
        queryKey: [authService.QUERY_KEY],
      })
    },
    onSuccess() {
      setIsAuth(true)
    },
  })

  const onSubmit = (data: LoginFields) => {
    loginMutation.mutate(data)
  }

  return {
    isPending: loginMutation.isPending,
    onSubmit: handleSubmit(onSubmit),
    register,
    formErrors: errors,
  }
}
