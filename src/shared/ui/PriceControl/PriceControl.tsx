import { InputGroup, NumberInput } from "@chakra-ui/react"
import { RussianRuble } from "lucide-react"
import { Controller, type Control } from "react-hook-form"

type PriceControlProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  defaultValue?: number | string
  step?: number
  name: string
}

export const PriceControl = (props: PriceControlProps) => {
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
