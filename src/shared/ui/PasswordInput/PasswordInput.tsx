import { Input, InputGroup, type InputProps } from "@chakra-ui/react"
import { useState } from "react"
import { ButtonShowPassword } from "./ButtonShowPassword"

type PasswordInputProps = Omit<InputProps, "type">

// fix: chakra ui предоставляет такой компонент через сниппенты
export const PasswordInput = (props: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <InputGroup
      endElement={
        <ButtonShowPassword
          isVisible={showPassword}
          onClick={() => setShowPassword((prev) => !prev)}
        />
      }
    >
      <Input {...props} type={showPassword ? "text" : "password"} />
    </InputGroup>
  )
}
