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
import { DEFAULT_VALUES } from "../constants"

export const useServiceForm = (initialData?: Service) => {
  const queryClient = useQueryClient()

  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors, isDirty },
    getValues,
  } = useForm<ServiceFormValues>({
    mode: "onBlur",
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(serviceCreateSchema),
  })

  const mutation = useMutation({
    mutationKey: [serviceService.QUERY_KEY],
    mutationFn: (data: ServiceFormValues) =>
      initialData ? serviceService.update(initialData.id, data) : serviceService.create(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [serviceService.QUERY_KEY],
      })
      reset(initialData || DEFAULT_VALUES)
      // sessionStorage.removeItem("unsavedServiceForm")
    },
  })

  // fix: сделать работающим и сохранять в sessionStorage
  // useBeforeUnload(
  //   useCallback(() => {
  //     if (isDirty) {
  //       sessionStorage.setItem("unsavedServiceForm", JSON.stringify(getValues()))
  //       return "У вас есть несохраненные изменения. Вы уверены, что хотите уйти?"
  //     }
  //   }, [isDirty, getValues])
  // )

  useEffect(() => {
    reset(initialData)
  }, [reset, initialData])

  // useEffect(() => {
  //   const savedData = sessionStorage.getItem("unsavedServiceForm")
  //   if (savedData && !initialData) {
  //     reset(JSON.parse(savedData))
  //   }
  // }, [reset, initialData])

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
    isDirty,
  }
}
