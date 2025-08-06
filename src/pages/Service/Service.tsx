import { useService } from "@/entities/service/model"
import { Box, Button, Card, Flex, Heading, Icon, Text } from "@chakra-ui/react"
import { ArrowLeft, FileText } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import { ServicePageContent } from "./ServicePageContent"
import { ServicePageSkeleton } from "./ServiceSkeleton"

export default function ServicePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { service, isLoading, isError, isEmpty, refetch } = useService(id || "")

  if (isLoading) {
    return <ServicePageSkeleton />
  }

  if (isError || isEmpty || !service) {
    return <ServicePageError onRetry={refetch} />
  }

  return <ServicePageContent service={service} onBack={() => navigate(-1)} />
}

const ServicePageError = ({ onRetry }: { onRetry: () => void }) => (
  <>
    <Button mb={6} variant="ghost">
      <ArrowLeft />
      Назад
    </Button>

    <Card.Root shadow="lg" borderRadius="xl" overflow="hidden">
      <Card.Body p={12}>
        <Flex direction="column" align="center" textAlign="center" gap={6}>
          <Box bg="red.50" p={4} borderRadius="full">
            <Icon as={FileText} boxSize={12} color="red.500" />
          </Box>
          <Heading size="lg">Ошибка загрузки</Heading>
          <Text fontSize="lg" color="gray.600">
            Не удалось загрузить информацию об услуге
          </Text>
          <Flex gap={4}>
            <Button onClick={onRetry} colorScheme="blue">
              Повторить попытку
            </Button>
            <Button variant="outline" onClick={() => window.history.back()}>
              Назад
            </Button>
          </Flex>
        </Flex>
      </Card.Body>
    </Card.Root>
  </>
)
