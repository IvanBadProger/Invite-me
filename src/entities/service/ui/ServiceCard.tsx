import {
  Badge,
  Card,
  Flex,
  FormatNumber,
  Image,
  Text,
} from "@chakra-ui/react"
import type { ServiceReduced, ServiceType } from "../model"

type ServiceCardProps = {
  features?: React.ReactNode
  onClick?: (id: ServiceReduced["id"]) => void
  isDisabled?: boolean
} & ServiceReduced

const TEXT_TYPE_BADGE: Record<ServiceType, string> = {
  basic: "Основная",
  additional: "Дополнительная",
}

export const ServiceCard = (props: ServiceCardProps) => {
  const {
    features,
    photo_url,
    id,
    price,
    title,
    type,
    archived,
    workTime,
    onClick,
    isDisabled,
  } = props

  const handleClick = onClick ? () => onClick(id) : undefined

  return (
    <Card.Root
      onClick={handleClick}
      opacity={isDisabled ? 0.5 : undefined}
      pointerEvents={isDisabled ? "none" : undefined}
    >
      {photo_url && <Image src={photo_url} alt="" />}

      <Card.Body gap={2}>
        <Card.Title>{title}</Card.Title>

        {archived && <Badge>В архиве</Badge>}

        <Flex gap={2} wrap={"wrap"}>
          <Text
            textStyle="2xl"
            fontWeight="medium"
            letterSpacing="tight"
            mt="2"
          >
            <FormatNumber
              value={parseFloat(price)}
              style="currency"
              currency="RUB"
            />
          </Text>

          {workTime && (
            <Text
              textStyle="2xl"
              fontWeight="medium"
              letterSpacing="tight"
              mt="2"
            >
              {workTime}
            </Text>
          )}
        </Flex>

        {type && <Badge>{TEXT_TYPE_BADGE[type]}</Badge>}
      </Card.Body>
      {features && <Card.Footer gap={2}>{features}</Card.Footer>}
    </Card.Root>
  )
}
