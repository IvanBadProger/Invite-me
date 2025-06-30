import { serviceService, type Service } from "@/entities/service"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useServiceDelete = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (id: Service["id"]) => serviceService.delete(id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [serviceService.QUERY_KEY],
      })
    },
  })

  return {
    onDelete: mutation.mutate,
    isLoading: mutation.isPending,
  }
}
