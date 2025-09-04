import type { ServiceReduced } from "@/entities/service"
import { Grid, GridItem, Stack, Text } from "@chakra-ui/react"

export const ServicesSeparatedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
      {children}
    </Grid>
  )
}

type Props = {
  basicServices: ServiceReduced[]
  additionalServices: ServiceReduced[]
  renderServiceCard: (service: ServiceReduced) => React.ReactNode
}

export const ServicesSeparated = ({
  basicServices,
  additionalServices,
  renderServiceCard,
}: Props) => (
  <ServicesSeparatedLayout>
    <GridItem>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Основные услуги
      </Text>
      <Stack gap={4}>
        {basicServices.map(renderServiceCard)}
        {basicServices.length === 0 && (
          <Text color="gray.500" textAlign="center" py={4}>
            Нет основных услуг
          </Text>
        )}
      </Stack>
    </GridItem>

    <GridItem>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Дополнительные услуги
      </Text>
      <Stack gap={4}>
        {additionalServices.map(renderServiceCard)}
        {additionalServices.length === 0 && (
          <Text color="gray.500" textAlign="center" py={4}>
            Нет дополнительных услуг
          </Text>
        )}
      </Stack>
    </GridItem>
  </ServicesSeparatedLayout>
)
