import { Field, NativeSelect, Spinner } from "@chakra-ui/react"

export type Option = {
  value: string
  label: string
}

export type SelectProps = {
  placeholder?: string
  errorMessage?: string
  options: Option[]
  label: string
  size?: "sm" | "md" | "lg" | "xl" | "xs"
  isLoading?: boolean
} & React.SelectHTMLAttributes<HTMLSelectElement>

export const Select = (props: SelectProps) => {
  const {
    placeholder,
    label,
    errorMessage,
    options,
    size,
    isLoading,
    ...rest
  } = props

  return (
    <Field.Root invalid={!!errorMessage}>
      <Field.Label>{isLoading ? <Spinner /> : label}</Field.Label>
      <NativeSelect.Root size={size}>
        <NativeSelect.Field placeholder={placeholder} {...rest}>
          {options.map(({ label, value }) => {
            return (
              <option key={value} value={value}>
                {label}
              </option>
            )
          })}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
      <Field.ErrorText>{errorMessage}</Field.ErrorText>
    </Field.Root>
  )
}
