import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authService } from "../api/auth.service"
import { useAuth } from "./useAuth"

export const useLogout = () => {
  const { isAuth, setIsAuth } = useAuth()
  const queryClient = useQueryClient()

  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    retry: false,
    onSettled() {
      queryClient.invalidateQueries({
        queryKey: [authService.QUERY_KEY],
      })
      setIsAuth(false)
      queryClient.removeQueries()
    },
  })

  return {
    logout: logoutMutation.mutate,
    isAuth,
  }
}
