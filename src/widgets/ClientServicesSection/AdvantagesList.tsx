import { List } from "@chakra-ui/react"
import { Heart, Star } from "lucide-react"
import { AdvantageItem } from "./AdvantageItem"

type AdvantagesListProps = {}

export const AdvantagesList = (props: AdvantagesListProps) => {
  const {} = props
  return (
    <List.Root
      gap={6}
      p={6}
      bg="white"
      borderRadius="xl"
      boxShadow="xl"
      border="1px solid"
      borderColor="gray.100"
      aria-label="Преимущества услуг"
    >
      <AdvantageItem
        icon={Star}
        iconColor="brand.pink.400"
        title="Премиальные материалы"
        description="Только качественные продукты"
      />

      <AdvantageItem
        icon={Heart}
        iconColor="brand.purple.400"
        title="Индивидуальный подход"
        description="Учитываем все ваши пожелания"
      />
    </List.Root>
  )
}
