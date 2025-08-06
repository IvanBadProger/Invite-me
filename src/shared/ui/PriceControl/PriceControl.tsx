import { InputGroup, NumberInput } from "@chakra-ui/react"
import { RussianRuble } from "lucide-react"
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form"

type PriceControlProps<T extends FieldValues> = {
  control: Control<T>
  defaultValue?: number | string
  step?: number
  name: Path<T>
}

export const PriceControl = <T extends FieldValues>(props: PriceControlProps<T>) => {
  const { control, defaultValue, step, name } = props

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <NumberInput.Root
          disabled={field.disabled}
          name={field.name}
          value={field.value}
          onValueChange={({ value }) => {
            field.onChange(value)
          }}
          defaultValue={String(defaultValue)}
          step={step}
          min={0}
        >
          <NumberInput.Control />
          <InputGroup startElement={<RussianRuble />}>
            <NumberInput.Input onBlur={field.onBlur} />
          </InputGroup>
        </NumberInput.Root>
      )}
    />
  )
}
