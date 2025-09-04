import { DecorativeIcon } from "@/shared/ui"
import { ServicesList } from "@/widgets"
import { Box, Container, Flex, Grid, Heading, Highlight, Text, VStack } from "@chakra-ui/react"
import { Heart, Sparkles, Star } from "lucide-react"
import { AdvantagesList } from "./AdvantagesList"

export const ClientServicesSection = () => {
  return (
    <Box
      id="services"
      as="section"
      aria-labelledby="services-heading"
      py={28}
      position="relative"
      overflow="hidden"
    >
      {/* Декоративные элементы */}
      <DecorativeIcon
        icon={Sparkles}
        top={{ base: "5%", lg: "15%" }}
        left="30%"
        color="brand.pink.300"
        opacity={0.8}
      />

      <DecorativeIcon
        icon={Heart}
        top={{ base: "25%", lg: "10%" }}
        right="12%"
        color="brand.purple.300"
        size="lg"
        opacity={0.7}
      />

      <DecorativeIcon
        icon={Star}
        bottom="20%"
        left="15%"
        color="brand.blue.300"
        size="lg"
        opacity={0.6}
      />

      <Container fluid asChild>
        <Grid
          templateColumns={{
            base: "1fr",
            lg: "1fr 1.2fr",
            xl: "1fr 1.5fr",
          }}
          gap={16}
          alignItems="start"
          position="relative"
          zIndex={2}
        >
          {/* Левая колонка - Заголовок и описание */}
          <VStack position="relative" w="full" gap={8} align="start">
            <SectionHeader />
            <AdvantagesList />
          </VStack>

          {/* Правая колонка - Список услуг */}
          <Box
            bg="white"
            borderRadius="3xl"
            p={6}
            boxShadow="xl"
            border="1px solid"
            borderColor="gray.200"
            position="relative"
            opacity={0.9}
            overflowY={"auto"}
            overflowX={"hidden"}
            maxH={"70vh"}
            _before={{
              content: '""',
              position: "absolute",
              inset: "-2px",
              borderRadius: "3xl",
              bg: "accent.gradient",
              zIndex: -1,
              opacity: 0.6,
            }}
          >
            <ServicesList
              separateByType={true}
              clickableCard={true}
              withFeatures={false}
              showCreateButton={false}
              title={undefined}
            />
          </Box>
        </Grid>
      </Container>
    </Box>
  )
}

export const SectionHeader = () => {
  return (
    <Flex flexDirection={"column"} gap={2} as="header">
      <Heading
        as="h3"
        textStyle="sm"
        fontWeight="semibold"
        color="brand.pink.500"
        letterSpacing="wider"
        textTransform="uppercase"
        id="services-heading"
      >
        Наши услуги
      </Heading>

      <Heading
        as="h4"
        size="2xl"
        fontFamily="Playfair Display"
        color="gray.800"
        position="relative"
        mt={2}
        _after={{
          content: '""',
          position: "absolute",
          bottom: "-10px",
          left: "0",
          width: "10%",
          height: "3px",
          bg: "accent.gradient",
          borderRadius: "2px",
        }}
      >
        <Highlight
          query={"каждом движении"}
          styles={{ bg: "text.gradient", bgClip: "text", color: "transparent" }}
        >
          Искусство в каждом движении
        </Highlight>
      </Heading>

      <Text fontSize="lg" color="gray.600" lineHeight="1.6" mt={4}>
        Профессиональный уход за ногтями с использованием премиальных материалов и индивидуальным
        подходом к каждому клиенту. Создаем красоту, которая вдохновляет.
      </Text>
    </Flex>
  )
}
