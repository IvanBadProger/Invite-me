import type { IconProps } from "@chakra-ui/react"
import { Box, Flex, Icon, List, Text } from "@chakra-ui/react"
import type { LucideIcon } from "lucide-react"

interface AdvantageItemProps {
  icon: LucideIcon
  iconColor?: IconProps["color"]
  title: string
  description: string
}

export const AdvantageItem = ({
  icon,
  iconColor = "brand.pink.400",
  title,
  description,
}: AdvantageItemProps) => {
  return (
    <List.Item asChild>
      <Flex align="center" gap={4}>
        <List.Indicator
          asChild
          boxSize={12}
          bg="brand.pink.50"
          borderRadius="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
          aria-hidden="true"
          p={2}
        >
          <Icon as={icon} boxSize={6} color={iconColor} />
        </List.Indicator>
        <Box>
          <Text fontWeight="semibold" color="gray.800">
            {title}
          </Text>
          <Text fontSize="sm" color="gray.600">
            {description}
          </Text>
        </Box>
      </Flex>
    </List.Item>
  )
}
