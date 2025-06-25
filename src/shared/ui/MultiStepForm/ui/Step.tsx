import { Box } from "@chakra-ui/react"
import { useEffect } from "react"

export type StepProps = {
  index: number
  children: React.ReactNode
  fieldNames: string[]
  setFieldNames?: React.Dispatch<React.SetStateAction<string[]>>
}

export const Step = (props: StepProps) => {
  const { children, setFieldNames, fieldNames } = props

  useEffect(() => {
    setFieldNames?.(fieldNames)
  }, [fieldNames, setFieldNames])

  return <Box>{children}</Box>
}
