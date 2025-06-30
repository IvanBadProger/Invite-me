import type { Service } from "@/entities/service"
import { Field, Form, PriceControl, RadioControl } from "@/shared/ui"
import { Button, Checkbox, Input } from "@chakra-ui/react"
import { Controller } from "react-hook-form"
import { LABELS, TYPES } from "../constants"
import { useServiceForm } from "../model/useServiceForm"

type ServiceFormProps = {
  initialData?: Service
}

export const ServiceForm = ({ initialData }: ServiceFormProps) => {
  const { control, errors, onSubmit, register, isSubmiting } =
    useServiceForm(initialData)

  return (
    <Form onSubmit={onSubmit}>
      <Field
        label={LABELS.title}
        isRequired
        errorMessage={errors.title?.message}
      >
        <Input placeholder={LABELS.title} {...register("title")} />
      </Field>

      <Field
        label={LABELS.description}
        errorMessage={errors.description?.message}
      >
        <Input
          placeholder={LABELS.description}
          {...register("description")}
        />
      </Field>

      <Field
        label={LABELS.price}
        errorMessage={errors.price?.message}
      >
        <PriceControl
          name="price"
          control={control}
          defaultValue={1000}
          step={100}
        />
      </Field>

      <Field
        errorMessage={errors.type?.message}
        isRequired
        label={LABELS.type}
      >
        <RadioControl
          name="type"
          control={control}
          defaultValue={TYPES[0].value}
          radioOptions={TYPES}
        />
      </Field>

      {/* fix: как правильно отображать? */}
      <Field
        label={LABELS.workTime}
        errorMessage={errors.workTime?.message}
      >
        <Input placeholder={LABELS.workTime} />
      </Field>

      <Field
        label={LABELS.archived}
        isLabelHidden
        errorMessage={errors.archived?.message}
      >
        <Controller
          name="archived"
          control={control}
          render={({ field }) => (
            <Checkbox.Root
              checked={field.value}
              onCheckedChange={({ checked }) =>
                field.onChange(checked)
              }
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>{LABELS.archived}</Checkbox.Label>
            </Checkbox.Root>
          )}
        />
      </Field>

      <Button
        type="submit"
        loading={isSubmiting}
        loadingText={"Сохранение"}
      >
        {initialData ? "Обновить" : "Создать"}
      </Button>
    </Form>
  )
}
