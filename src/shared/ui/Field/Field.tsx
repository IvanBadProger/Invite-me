import { Field as ChakraField } from "@chakra-ui/react"

type FieldProps = {
  label?: string
  isLabelHidden?: boolean
  errorMessage?: string
  children: React.ReactNode
  isRequired?: boolean
}

export const Field = (props: FieldProps) => {
  const { label, errorMessage, isLabelHidden, children, isRequired } = props

  return (
    <ChakraField.Root invalid={!!errorMessage}>
      {label && <ChakraField.Label srOnly={isLabelHidden}>{label}</ChakraField.Label>}
      {isRequired && <ChakraField.RequiredIndicator />}

      {children}

      <ChakraField.ErrorText>{errorMessage}</ChakraField.ErrorText>
    </ChakraField.Root>
  )
}
