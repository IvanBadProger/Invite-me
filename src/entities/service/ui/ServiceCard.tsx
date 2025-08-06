import { ROUTES } from "@/shared/lib"
import { Badge, Box, Card, Flex, FormatNumber, Image, Text } from "@chakra-ui/react"
import { useNavigate } from "react-router"
import type { ServiceReduced, ServiceType } from "../model"

const SERVICE_TYPE_LABELS: Record<ServiceType, string> = {
  basic: "Основная",
  additional: "Дополнительная",
} as const

const ARCHIVED_LABEL = "В архиве"

type ServiceCardProps = {
  features?: React.ReactNode
  isDisabled?: boolean
  isLink?: boolean
} & ServiceReduced

export const ServiceCard = ({
  features,
  photo_url,
  id,
  price,
  title,
  type,
  archived,
  workTime,
  isLink,
}: ServiceCardProps) => {
  const navigate = useNavigate()
  const isDisabled = archived

  const handleClick = () => {
    if (!isDisabled && isLink) {
      navigate(ROUTES.SERVICE(id))
    }
  }

  return (
    <Card.Root
      onClick={handleClick}
      opacity={isDisabled ? 0.5 : 1}
      pointerEvents={isDisabled ? "none" : "auto"}
      cursor={archived ? "default" : "pointer"}
      flexDirection={{ md: "row", base: "column" }}
      padding={4}
    >
      <Card.Body gap={2} padding={2} flex={1}>
        <ServiceHeader title={title} type={type} archived={archived} />
        <ServiceInfo price={price} workTime={workTime} />

        {features && <Box mt={2}>{features}</Box>}
      </Card.Body>

      {photo_url && (
        <Box mt={{ base: 2, md: 0 }} ml={{ md: 4 }}>
          <Image
            rounded={"xl"}
            src={photo_url}
            alt={title}
            width={{ base: "100%", md: 200 }}
            height={200}
            objectFit="cover"
          />
        </Box>
      )}
    </Card.Root>
  )
}

const ServiceHeader = ({
  title,
  type,
  archived,
}: {
  title: string
  type?: ServiceType
  archived?: boolean
}) => (
  <Flex direction="column" gap={2}>
    <Card.Title>{title}</Card.Title>
    <Flex gap={2} align="center" flexWrap="wrap">
      {type && (
        <Badge colorScheme={type === "basic" ? "blue" : "green"}>{SERVICE_TYPE_LABELS[type]}</Badge>
      )}
      {archived && <Badge colorScheme="red">{ARCHIVED_LABEL}</Badge>}
    </Flex>
  </Flex>
)

const ServiceInfo = ({ price, workTime }: { price: string; workTime?: string }) => (
  <Flex gap={4} wrap="wrap" alignItems="center">
    <PriceDisplay price={price} />
    {workTime && <WorkTimeDisplay workTime={workTime} />}
  </Flex>
)

const PriceDisplay = ({ price }: { price: string }) => (
  <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight">
    <FormatNumber value={parseFloat(price)} style="currency" currency="RUB" />
  </Text>
)

const WorkTimeDisplay = ({ workTime }: { workTime: string }) => (
  <Text textStyle="lg" fontWeight="medium" color="gray.600">
    {workTime}
  </Text>
)
