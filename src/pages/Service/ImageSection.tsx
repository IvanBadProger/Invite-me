import type { Service } from "@/entities/service"
import { ImageFallback } from "@/shared/ui"
import { Card, Image } from "@chakra-ui/react"

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
        <ImageFallback
          height={{ base: "250px", md: "350px" }}
          helperText="Для этой услуги не добавлено изображение"
        />
      )}
    </Card.Body>
  </Card.Root>
)
