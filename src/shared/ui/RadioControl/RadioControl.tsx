import { HStack, RadioGroup } from "@chakra-ui/react"
import { Controller, type Control } from "react-hook-form"
import type { Option } from "../Select/Select"

type RadioControlProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any, any>
  defaultValue?: string
  radioOptions: Option[]
  name: string
}

export const RadioControl = (props: RadioControlProps) => {
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
              <RadioGroup.Item
                key={option.value}
                value={option.value}
              >
                <RadioGroup.ItemHiddenInput onBlur={field.onBlur} />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>
                  {option.label}
                </RadioGroup.ItemText>
              </RadioGroup.Item>
            ))}
          </HStack>
        </RadioGroup.Root>
      )}
    />
  )
}
