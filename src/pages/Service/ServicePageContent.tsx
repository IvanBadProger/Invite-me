import type { Service } from "@/entities/service"
import {
  Box,
  Button,
  Card,
  Flex,
  FormatNumber,
  Grid,
  GridItem,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react"
import { ArrowLeft, Clock } from "lucide-react"
import { ImageSection } from "./ImageSection"
import { TypeBadges } from "./TypeBadges"

export const ServicePageContent = ({
  service,
  onBack,
}: {
  service: Service
  onBack: () => void
}) => (
  <>
    <Button onClick={onBack} mb={6} variant="ghost" size={{ base: "sm", md: "md" }}>
      <ArrowLeft />
      Назад
    </Button>

    <Grid templateColumns={{ base: "1fr", xl: "3fr 2fr" }} gap={8}>
      {/* Основная информация */}
      <Card.Root shadow="lg" borderRadius="xl" overflow="hidden">
        <Card.Body p={{ base: 6, md: 8 }}>
          <Flex direction="column" gap={8}>
            {/* Заголовок и бейджи */}
            <Box>
              <Flex
                justify="space-between"
                align={{ base: "start", md: "center" }}
                gap={4}
                wrap="wrap"
              >
                <Heading as="h1" size={{ base: "lg", md: "xl" }} lineHeight="short">
                  {service.title}
                </Heading>
                <TypeBadges type={service.type} archived={service.archived} />
              </Flex>
            </Box>

            {/* Цена и время */}
            <Flex direction={{ base: "column", md: "row" }} gap={8} wrap="wrap" pt={2}>
              <Box>
                <Text
                  fontSize={{ base: "2xl", md: "3xl" }}
                  fontWeight="bold"
                  color="blue.600"
                  lineHeight="tight"
                >
                  <FormatNumber value={parseFloat(service.price)} style="currency" currency="RUB" />
                </Text>
                <Text fontSize="sm" color="gray.500" mt={1}>
                  Стоимость услуги
                </Text>
              </Box>

              {service.workTime && (
                <Flex align="center" gap={3}>
                  <Box bg="blue.50" p={2} borderRadius="full">
                    <Icon as={Clock} boxSize={5} color="blue.500" />
                  </Box>
                  <Box>
                    <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="medium">
                      {service.workTime}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      Время выполнения
                    </Text>
                  </Box>
                </Flex>
              )}
            </Flex>

            {/* Описание */}
            {service.description && (
              <Box pt={2}>
                <Heading as="h2" size="md" mb={4}>
                  Описание услуги
                </Heading>
                <Text fontSize="lg" lineHeight="tall" color="gray.700" whiteSpace="pre-wrap">
                  {service.description}
                </Text>
              </Box>
            )}
          </Flex>
        </Card.Body>
      </Card.Root>

      {/* Изображение */}
      <GridItem order={{ base: -1, xl: 0 }}>
        <ImageSection title={service.title} photo_url={service.photo_url} />
      </GridItem>
    </Grid>
  </>
)
