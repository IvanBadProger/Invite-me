import { Button, Card, Flex, Grid, GridItem, Skeleton } from "@chakra-ui/react"
import { ArrowLeft } from "lucide-react"

export const ServicePageSkeleton = () => (
  <>
    <Button mb={6} variant="ghost">
      <ArrowLeft />
      Назад
    </Button>

    <Card.Root shadow="lg" borderRadius="xl" overflow="hidden">
      <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8} p={8}>
        <GridItem>
          <Flex direction="column" gap={6}>
            <Skeleton height="40px" width="60%" />
            <Flex gap={2}>
              <Skeleton height="24px" width="100px" />
              <Skeleton height="24px" width="80px" />
            </Flex>
            <Skeleton height="48px" width="40%" />
            <Skeleton height="20px" width="100%" />
            <Skeleton height="20px" width="80%" />
            <Skeleton height="20px" width="90%" />
          </Flex>
        </GridItem>

        <GridItem>
          <Skeleton height="300px" borderRadius="lg" />
        </GridItem>
      </Grid>
    </Card.Root>
  </>
)
