import { EmptyState as ChakraEmptyState, VStack } from "@chakra-ui/react"
import { Ban } from "lucide-react"

type ChakraEmptyStateProps = {
  text: string
  action?: React.ReactNode
}

export const EmptyState = (props: ChakraEmptyStateProps) => {
  const { text, action } = props
  return (
    <ChakraEmptyState.Root>
      <ChakraEmptyState.Content>
        <ChakraEmptyState.Indicator>
          <Ban />
        </ChakraEmptyState.Indicator>
        <VStack textAlign="center">
          <ChakraEmptyState.Title>{text}</ChakraEmptyState.Title>
          {action}
        </VStack>
      </ChakraEmptyState.Content>
    </ChakraEmptyState.Root>
  )
}
