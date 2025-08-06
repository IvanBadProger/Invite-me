import type { Service } from "@/entities/service"
import { Badge, Flex } from "@chakra-ui/react"

const SERVICE_TYPE_LABELS = {
  basic: "Основная",
  additional: "Дополнительная",
} as const

const ARCHIVED_LABEL = "В архиве"

export const TypeBadges = ({ type, archived }: Pick<Service, "type" | "archived">) => (
  <Flex gap={2} align="center" flexWrap="wrap">
    {type && (
      <Badge
        colorScheme={type === "basic" ? "blue" : "green"}
        fontSize={{ base: "sm", md: "md" }}
        px={3}
        py={1}
        borderRadius="full"
      >
        {SERVICE_TYPE_LABELS[type]}
      </Badge>
    )}
    {archived && (
      <Badge
        colorScheme="red"
        fontSize={{ base: "sm", md: "md" }}
        px={3}
        py={1}
        borderRadius="full"
      >
        {ARCHIVED_LABEL}
      </Badge>
    )}
  </Flex>
)
