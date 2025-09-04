import { Box } from "@chakra-ui/react"
import { Eye, EyeClosed } from "lucide-react"

type ButtonShowPasswordProps = {
  isVisible: boolean
  onClick: () => void
}

export const ButtonShowPassword = (props: ButtonShowPasswordProps) => {
  const { isVisible, onClick } = props
  const icon = isVisible ? <EyeClosed /> : <Eye />
  const label = isVisible ? "Показать пароль" : "Скрыть пароль"

  return (
    <Box as={"button"} aria-label={label} title={label} onClick={onClick} cursor={"pointer"}>
      {icon}
    </Box>
  )
}
