import { Wrap } from "@chakra-ui/react"

interface ServicesGridLayoutProps {
  children: React.ReactNode
}

export const ServicesLayout = ({ children }: ServicesGridLayoutProps) => (
  <Wrap gap={4} justifyContent={"start"} alignItems={"stretch"}>
    {children}
  </Wrap>
)
