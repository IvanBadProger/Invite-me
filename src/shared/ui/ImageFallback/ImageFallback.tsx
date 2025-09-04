import { Flex, Icon, Text, type FlexProps } from "@chakra-ui/react"
import { ImageIcon } from "lucide-react"

type Props = {
  helperText?: string
} & FlexProps

export const ImageFallback = ({ helperText, ...rest }: Props) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      bg="gray.100"
      direction="column"
      gap={3}
      {...rest}
    >
      <Icon as={ImageIcon} boxSize={12} color="gray.400" />
      <Text color="gray.500" fontSize="lg">
        Изображение отсутствует
      </Text>
      {helperText && (
        <Text color="gray.400" fontSize="sm">
          {helperText}
        </Text>
      )}
    </Flex>
  )
}
