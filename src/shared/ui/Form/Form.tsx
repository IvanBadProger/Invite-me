import { Flex, Heading, type FlexProps } from "@chakra-ui/react"
import { useId } from "react"

// Если необходимо добавить aria-labelledby (ну или aria-label в целом тоже) воспользуйся formTitle со значение isHidden: true

const sizeMap = {
  sm: "400px",
  md: "600px",
  lg: "800px",
}

type FormProps = {
  formTitle?: string
  flexProps?: FlexProps
  size?: "sm" | "md" | "lg"
} & Omit<React.FormHTMLAttributes<HTMLFormElement>, "aria-labelledby">

export const Form = ({ children, formTitle, flexProps, size = "md", ...rest }: FormProps) => {
  const formId = useId()
  const titleId = `${formId}-title`

  return (
    <Flex
      shadow={"xl"}
      rounded={"xl"}
      paddingY={{ base: 4, lg: 6 }}
      paddingX={{ base: 6, lg: 8 }}
      asChild
      flexDirection={"column"}
      gap={4}
      width={"full"}
      maxWidth={sizeMap[size]}
      {...flexProps}
    >
      <form aria-labelledby={titleId} {...rest}>
        {formTitle && (
          <Heading as={"div"} id={titleId}>
            {formTitle}
          </Heading>
        )}

        {children}
      </form>
    </Flex>
  )
}
