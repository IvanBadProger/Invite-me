import { useServices, type ServiceReduced } from "@/entities/service/model"
import { ServiceCard } from "@/entities/service/ui"
import { ServiceCreateButton, ServiceEditButton } from "@/features/services/create-edit"
import { ServiceDeleteButton } from "@/features/services/delete"
import { Box, Code, Flex, Grid, Stack, Text } from "@chakra-ui/react"
import { ServicesGrid } from "./ServicesGrid"
import { ServicesListEmptyState } from "./ServicesListEmptyState"
import { ServicesListSkeleton } from "./ServicesListSkeleton"
import { ServicesSeparatedGrid } from "./ServicesSeparatedGrid"

interface Props {
  withFeatures?: boolean
  separateByType?: boolean
  clickableCard?: boolean
}

export const ServicesList = ({
  withFeatures = false,
  separateByType = false,
  clickableCard = true,
}: Props) => {
  const { isLoading, isPlaceholderData, services, isError, error, isEmpty } = useServices()

  if (isError) {
    return (
      <>
        <Text>Ошибка при получении услуг. Попробуйте позже</Text>
        {import.meta.env.DEV && <Code>{error.message}</Code>}
      </>
    )
  }

  if (isLoading) {
    return separateByType ? (
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
        <ServicesListSkeleton />
        <ServicesListSkeleton />
      </Grid>
    ) : (
      <ServicesGrid>
        <ServicesListSkeleton />
      </ServicesGrid>
    )
  }

  if (isEmpty) {
    return separateByType ? (
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
        <ServicesListEmptyState />
        <ServicesListEmptyState />
      </Grid>
    ) : (
      <ServicesGrid>
        <ServicesListEmptyState />
      </ServicesGrid>
    )
  }

  const renderServiceCard = (service: ServiceReduced) => (
    <ServiceCard
      features={
        withFeatures && (
          <Stack direction="row" gap={{ base: 4, md: 2 }} alignItems={"end"}>
            <ServiceEditButton id={service.id} />
            <ServiceDeleteButton id={service.id} />
          </Stack>
        )
      }
      key={service.id}
      {...service}
      isDisabled={isPlaceholderData}
      isLink={clickableCard}
    />
  )

  if (separateByType) {
    // fix: когда появятся эндпоинты получать отдельно с сервера основные и отдельно с сервера допы
    const basicServices = services?.filter((service) => service.type === "basic") || []
    const additionalServices = services?.filter((service) => service.type === "additional") || []

    return (
      <Flex shadow={"xl"} padding={6} flexDirection={"column"} rowGap={6}>
        <ServicesSeparatedGrid
          basicServices={basicServices}
          additionalServices={additionalServices}
          renderServiceCard={renderServiceCard}
        />
        <Box marginInline={"auto"}>
          <ServiceCreateButton />
        </Box>
      </Flex>
    )
  }

  return (
    <Flex shadow={"xl"} padding={6} flexDirection={"column"} rowGap={4}>
      <ServicesGrid>{services?.map(renderServiceCard)}</ServicesGrid>
      <Box marginInline={"auto"}>
        <ServiceCreateButton />
      </Box>
    </Flex>
  )
}
