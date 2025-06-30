import { useAuth } from "@/features/auth"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { serviceService } from "../api/services.service"

export const useServices = () => {
  const isAuth = useAuth((state) => state.isAuth)

  const { data, ...rest } = useQuery({
    queryKey: [serviceService.QUERY_KEY],
    queryFn: (meta) =>
      serviceService.getAll({ isAdmin: isAuth }, meta),
    placeholderData: keepPreviousData,
    select: (data) => data.data.data,
  })

  return {
    services: data ?? [],
    isEmpty: !data?.length,
    ...rest,
  }
}
