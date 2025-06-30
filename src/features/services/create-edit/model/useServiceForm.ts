import {
  serviceCreateSchema,
  serviceService,
  type Service,
  type ServiceCreate as ServiceFormValues,
} from "@/entities/service"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useBeforeUnload } from "react-router"
import { DEFAULT_VALUES } from "../constants"

export const useServiceForm = (initialData?: Service) => {
  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ServiceFormValues>({
    mode: "onBlur",
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(serviceCreateSchema),
  })

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationKey: [serviceService.QUERY_KEY],
    mutationFn: (data: ServiceFormValues) =>
      initialData
        ? serviceService.update(initialData.id, data)
        : serviceService.create(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [serviceService.QUERY_KEY],
      })
    },
  })

  // fix: сделать работающим и сохранять в sessionStorage
  useBeforeUnload(() =>
    isDirty
      ? "У вас есть несохраненные изменения. Вы уверены, что хотите уйти?"
      : undefined
  )

  useEffect(() => {
    reset(initialData)
  }, [reset, initialData])

  const onSubmit = handleSubmit((data: ServiceFormValues) => {
    mutation.mutate(data)
  })

  return {
    onSubmit,
    isSubmiting: mutation.isPending,
    control,
    register,
    errors,
    reset,
  }
}
