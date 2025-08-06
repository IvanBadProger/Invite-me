import { HStack, RadioGroup } from "@chakra-ui/react"
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form"
import type { Option } from "../Select/Select"

type RadioControlProps<T extends FieldValues> = {
  control: Control<T>
  defaultValue?: string
  radioOptions: Option[]
  name: Path<T>
}

export const RadioControl = <T extends FieldValues>(props: RadioControlProps<T>) => {
  const { control, defaultValue, radioOptions, name } = props

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <RadioGroup.Root
          defaultValue={defaultValue}
          name={field.name}
          value={field.value}
          onValueChange={({ value }) => {
            field.onChange(value)
          }}
        >
          <HStack gap="6">
            {radioOptions.map((option) => (
              <RadioGroup.Item key={option.value} value={option.value}>
                <RadioGroup.ItemHiddenInput onBlur={field.onBlur} />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>{option.label}</RadioGroup.ItemText>
              </RadioGroup.Item>
            ))}
          </HStack>
        </RadioGroup.Root>
      )}
    />
  )
}
