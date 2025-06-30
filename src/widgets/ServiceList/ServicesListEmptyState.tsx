import { ServiceCreateButton } from "@/features/services/create-edit"
import { EmptyState, VStack } from "@chakra-ui/react"
import { Ban } from "lucide-react"

export const ServicesListEmptyState = () => {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <Ban />
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title>Услуг нет</EmptyState.Title>
          <ServiceCreateButton />
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  )
}
