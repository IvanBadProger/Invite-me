import { SimpleGrid } from "@chakra-ui/react"

const gridStyles = {
  gap: 4,
  minChildWidth: "sm",
  justifyContent: "start",
  alignItems: "stretch",
} as const

export const ServicesGrid = ({ children }: { children: React.ReactNode }) => (
  <SimpleGrid {...gridStyles}>{children}</SimpleGrid>
)
