import { ROUTES } from "@/shared/lib"
import { ImageFallback } from "@/shared/ui"
import { Badge, Card, FormatNumber, Image, Stack, Text, Wrap } from "@chakra-ui/react"
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
  work_time,
  isLink,
}: ServiceCardProps) => {
  const navigate = useNavigate()
  const isDisabled = archived
  const isHoverable = isDisabled || !isLink

  const handleClick = () => {
    if (!isDisabled && isLink) {
      navigate(ROUTES.SERVICE(id))
    }
  }

  return (
    <Card.Root
      onClick={handleClick}
      cursor={isHoverable ? "default" : "pointer"}
      position="relative"
      w={"full"}
      maxW={"xs"}
      overflow={"hidden"}
      transitionDuration={"fast"}
      boxShadow={"md"}
      _hover={{
        transform: isHoverable ? "none" : "translateY(-2px)",
        boxShadow: isHoverable ? "none" : "xl",
        borderColor: isHoverable ? "gray.200" : "brand.pink.200",
      }}
    >
      {photo_url ? (
        <Image
          src={photo_url}
          alt={title}
          objectFit="cover"
          objectPosition={"center"}
          opacity={isDisabled ? 0.6 : 1}
          h={"150px"}
        />
      ) : (
        <ImageFallback h={"150px"} />
      )}

      <Card.Body flex={1} padding={4} opacity={isDisabled ? 0.5 : 1} gap={4}>
        <ServiceHeader title={title} type={type} archived={archived} />
        <ServiceInfo price={price} work_time={work_time} />
      </Card.Body>

      {features && <Card.Footer>{features}</Card.Footer>}
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
  <Stack gap={2}>
    <Wrap gap={2}>
      {type && <Badge bgColor={"brand.pink.100"}>{SERVICE_TYPE_LABELS[type]}</Badge>}
      {archived && <Badge colorScheme="red">{ARCHIVED_LABEL}</Badge>}
    </Wrap>
    <Card.Title maxLines={2}>{title}</Card.Title>
  </Stack>
)

const ServiceInfo = ({ price, work_time }: { price: string; work_time?: string }) => (
  <Wrap gap={4}>
    <PriceDisplay price={price} />
    {work_time && <work_timeDisplay work_time={work_time} />}
  </Wrap>
)

const PriceDisplay = ({ price }: { price: string }) => (
  <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight">
    <FormatNumber value={parseFloat(price)} style="currency" currency="RUB" />
  </Text>
)

const work_timeDisplay = ({ work_time }: { work_time: string }) => (
  <Text textStyle="lg" fontWeight="medium" color="gray.600">
    {work_time}
  </Text>
)
