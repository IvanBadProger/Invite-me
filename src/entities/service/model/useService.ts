import { useQuery } from "@tanstack/react-query"
import { serviceService } from "../api"
import type { Service } from "./types"

export const useService = (id: Service["id"]) => {
  const { data, ...rest } = useQuery({
    queryKey: [serviceService.QUERY_KEY, id],
    queryFn: () => serviceService.getById(id),
    enabled: !!id,
  })

  return {
    service: data,
    isEmpty: !rest.isLoading && !data,
    ...rest,
  }
}
