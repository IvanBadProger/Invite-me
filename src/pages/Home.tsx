import { ServicesList } from "@/widgets"
import { Heading } from "@chakra-ui/react"

export default function Home() {
  return (
    <>
      <Heading textAlign={"center"} mb={4}>
        Предоставляемые услуги
      </Heading>
      <ServicesList separateByType />
    </>
  )
}
