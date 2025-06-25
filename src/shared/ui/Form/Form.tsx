import { useId } from "react"
import { Heading } from "@chakra-ui/react"

// Если необходимо добавить aria-labelledby (ну или aria-label в целом тоже) воспользуйся formTitle со значение isHidden: true

type FormProps = {
  formTitle?: string
} & Omit<React.FormHTMLAttributes<HTMLFormElement>, "aria-labelledby">

export const Form = ({
  children,
  className,
  formTitle,
  ...rest
}: FormProps) => {
  const formId = useId()
  const titleId = `${formId}-title`

  return (
    <form className={className} aria-labelledby={titleId} {...rest}>
      {formTitle && <Heading as={"div"} id={titleId} />}

      {children}
    </form>
  )
}
