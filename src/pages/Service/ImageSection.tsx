import type { Service } from "@/entities/service"
import { Card, Flex, Icon, Image, Text } from "@chakra-ui/react"
import { ImageIcon } from "lucide-react"

export const ImageSection = ({ title, photo_url }: Pick<Service, "title" | "photo_url">) => (
  <Card.Root
    shadow="lg"
    borderRadius="xl"
    overflow="hidden"
    height="fit-content"
    position="sticky"
    top={8}
  >
    <Card.Body p={0}>
      {photo_url ? (
        <Image
          src={photo_url}
          alt={title}
          width="100%"
          height={{ base: "250px", md: "350px" }}
          objectFit="cover"
        />
      ) : (
        <Flex
          height={{ base: "250px", md: "350px" }}
          alignItems="center"
          justifyContent="center"
          bg="gray.50"
          direction="column"
          gap={3}
        >
          <Icon as={ImageIcon} boxSize={12} color="gray.400" />
          <Text color="gray.500" fontSize="lg">
            Изображение отсутствует
          </Text>
          <Text color="gray.400" fontSize="sm">
            Для этой услуги не добавлено изображение
          </Text>
        </Flex>
      )}
    </Card.Body>
  </Card.Root>
)
