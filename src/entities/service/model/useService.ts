import { useAuth } from "@/features/auth"
import { useQuery } from "@tanstack/react-query"
import { serviceService } from "../api"
import type { Service } from "./types"

export const useService = (id: Service["id"]) => {
  const isAuth = useAuth((state) => state.isAuth)

  const { data, ...rest } = useQuery({
    queryKey: [serviceService.QUERY_KEY, id],
    queryFn: () => serviceService.getById(id, { isAdmin: isAuth }),
    enabled: !!id,
  })

  return {
    service: data,
    isEmpty: !rest.isLoading && !data,
    ...rest,
  }
}
