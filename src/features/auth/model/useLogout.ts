import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuth } from "./useAuth"
import { authService } from "../api/auth.service"

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
      queryClient.removeQueries()
      setIsAuth(false)
    },
  })

  return {
    logout: logoutMutation.mutate,
    isAuth,
  }
}
