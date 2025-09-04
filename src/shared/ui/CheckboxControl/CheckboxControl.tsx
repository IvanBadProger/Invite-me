import { Checkbox } from "@chakra-ui/react"
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form"

type CheckboxControlProps<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  label?: string
}

export const CheckboxControl = <T extends FieldValues>(props: CheckboxControlProps<T>) => {
  const { control, name, label } = props

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Checkbox.Root
          checked={field.value}
          onCheckedChange={({ checked }) => field.onChange(checked)}
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control />
          {label && <Checkbox.Label>{label}</Checkbox.Label>}
        </Checkbox.Root>
      )}
    />
  )
}
