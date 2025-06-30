import { serviceService, type Service } from "@/entities/service"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useServicePhoto = () => {
  const queryClient = useQueryClient()

  const uploadMutation = useMutation({
    mutationFn: (vars: { id: Service["id"]; formData: FormData }) =>
      serviceService.uploadPhoto(vars.id, vars.formData),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [serviceService.QUERY_KEY],
      })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: Service["id"]) => serviceService.deletePhoto(id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [serviceService.QUERY_KEY],
      })
    },
  })

  return {
    onUpload: uploadMutation.mutate,
    onDelete: deleteMutation.mutate,
    isLoading: uploadMutation.isPending || deleteMutation.isPending,
  }
}
