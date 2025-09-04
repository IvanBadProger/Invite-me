import { useServices, type ServiceReduced } from "@/entities/service/model"
import { ServiceCard } from "@/entities/service/ui"
import { ServiceCreateButton, ServiceEditButton } from "@/features/services/create-edit"
import { ServiceDeleteButton } from "@/features/services/delete"
import { EmptyState, SkeletonList } from "@/shared/ui"
import { Box, Flex, Heading, Stack } from "@chakra-ui/react"
import type React from "react"
import { useCallback, useMemo } from "react"
import { ErrorState } from "./ErrorState"
import { ServicesLayout } from "./ServicesGrid"
import { ServicesSeparated, ServicesSeparatedLayout } from "./ServicesSeparatedGrid"

interface ServicesListProps {
  withFeatures?: boolean
  separateByType?: boolean
  clickableCard?: boolean
  title?: string
  showCreateButton?: boolean
}

export const ServicesList = ({
  withFeatures = false,
  separateByType = false,
  clickableCard = true,
  title,
  showCreateButton = true,
}: ServicesListProps) => {
  const { isLoading, isPlaceholderData, services, isError, error, isEmpty, refetch } = useServices()
  console.log("Это сервисы: ", services)
  const { basicServices, additionalServices } = useMemo(
    () => ({
      basicServices: services?.filter((s) => s.type === "basic") || [],
      additionalServices: services?.filter((s) => s.type === "additional") || [],
    }),
    [services]
  )

  const handleRetry = () => {
    refetch()
  }

  const renderServiceCard = useCallback(
    (service: ServiceReduced) => (
      <ServiceCard
        features={
          withFeatures && (
            <Stack direction="row" gap={{ base: 4, md: 2 }} alignItems="end">
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
    ),
    [withFeatures, isPlaceholderData, clickableCard]
  )

  const renderFallback = useCallback(
    (component: React.ReactNode) => {
      if (separateByType) {
        return (
          <ServicesSeparatedLayout>
            <Stack gap={4}>
              <Heading textAlign={"center"}>Основные</Heading>
              {component}
            </Stack>
            <Stack gap={4}>
              <Heading textAlign={"center"}>Дополнительные</Heading>
              {component}
            </Stack>
          </ServicesSeparatedLayout>
        )
      }

      return <ServicesLayout>{component}</ServicesLayout>
    },
    [separateByType]
  )

  const renderContent = () => {
    if (separateByType) {
      return (
        <ServicesSeparated
          basicServices={basicServices}
          additionalServices={additionalServices}
          renderServiceCard={renderServiceCard}
        />
      )
    }

    return <ServicesLayout>{services?.map(renderServiceCard)}</ServicesLayout>
  }

  if (isError) {
    return <ErrorState error={error} handleRetry={handleRetry} />
  }

  return (
    <Box boxShadow="sm" bg="white" borderRadius="xl" py={4} px={6}>
      {title && (
        <Heading size="xl" textAlign={"center"} mb={6}>
          {title}
        </Heading>
      )}

      {isLoading
        ? renderFallback(<SkeletonList />)
        : isEmpty
        ? renderFallback(<EmptyState text="Услуг пока нет" />)
        : renderContent()}

      {showCreateButton && (
        <Flex justify="center" mt={8}>
          <ServiceCreateButton />
        </Flex>
      )}
    </Box>
  )
}
