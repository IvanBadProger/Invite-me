import { Flex, Heading } from "@chakra-ui/react"
import { useId } from "react"

// Если необходимо добавить aria-labelledby (ну или aria-label в целом тоже) воспользуйся formTitle со значение isHidden: true

type FormProps = {
  formTitle?: string
} & Omit<React.FormHTMLAttributes<HTMLFormElement>, "aria-labelledby">

export const Form = ({ children, formTitle, ...rest }: FormProps) => {
  const formId = useId()
  const titleId = `${formId}-title`

  return (
    <Flex
      shadow={"xl"}
      paddingY={{ base: 4, lg: 6 }}
      paddingX={{ base: 6, lg: 8 }}
      rounded={"md"}
      asChild
      maxW={"fit-content"}
    >
      <form aria-labelledby={titleId} {...rest}>
        {formTitle && <Heading as={"div"} id={titleId} />}

        {children}
      </form>
    </Flex>
  )
}
