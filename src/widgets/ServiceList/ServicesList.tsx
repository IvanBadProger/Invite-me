import { useServices } from "@/entities/service/model"
import { ServiceCard } from "@/entities/service/ui"
import {
  ServiceCreateButton,
  ServiceEditButton,
} from "@/features/services/create-edit"
import { ServiceDeleteButton } from "@/features/services/delete"
import { Container, SimpleGrid, Stack, Text } from "@chakra-ui/react"
import { ServicesListEmptyState } from "./ServicesListEmptyState"
import { ServicesListSkeleton } from "./ServicesListSkeleton"

const gridStyles = {
  maxW: { base: "100%", md: "80%", lg: "60%" },
  gap: 4,
  minChildWidth: "sm",
  shadow: "xl",
  padding: 4,
  justifyContent: "start",
  alignItems: "center",
} as const

export const ServicesList = () => {
  const {
    isLoading,
    isPlaceholderData,
    services,
    isError,
    error,
    isEmpty,
  } = useServices()

  if (isError) {
    return (
      <Container>
        <Text>{error.message}</Text>
      </Container>
    )
  }

  if (isLoading) {
    return (
      <SimpleGrid {...gridStyles}>
        <ServicesListSkeleton />
      </SimpleGrid>
    )
  }

  if (isEmpty) {
    return (
      <SimpleGrid {...gridStyles}>
        <ServicesListEmptyState />
      </SimpleGrid>
    )
  }

  return (
    <SimpleGrid {...gridStyles}>
      {services?.map((service) => (
        <ServiceCard
          features={
            <Stack direction="row" gap={4}>
              <ServiceEditButton id={service.id} />
              <ServiceDeleteButton id={service.id} />
            </Stack>
          }
          key={service.id}
          {...service}
          isDisabled={isPlaceholderData}
        />
      ))}
      <ServiceCreateButton />
    </SimpleGrid>
  )
}
