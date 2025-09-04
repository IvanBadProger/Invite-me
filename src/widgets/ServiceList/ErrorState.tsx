import { Alert, Box, Button, Code } from "@chakra-ui/react"
import { RefreshCw } from "lucide-react"

type ErrorStateProps = {
  error?: Error | null
  handleRetry?: () => void
}

export const ErrorState = (props: ErrorStateProps) => {
  const { error, handleRetry } = props
  return (
    <Alert.Root
      status="error"
      borderRadius="lg"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      py={6}
    >
      <Alert.Indicator boxSize={8} mr={0} mb={4} />
      <Alert.Title fontSize="lg" mb={2}>
        Ошибка при загрузке услуг
      </Alert.Title>
      <Alert.Description mb={4}>
        Не удалось загрузить список услуг. Пожалуйста, попробуйте позже.
      </Alert.Description>
      {handleRetry && (
        <Button onClick={handleRetry} variant="outline" size="sm">
          <RefreshCw />
          Попробовать снова
        </Button>
      )}
      {import.meta.env.DEV && (
        <Box mt={4} p={3} bg="gray.100" borderRadius="md" width="full">
          <Code colorScheme="red" fontSize="sm">
            {error?.message || "Не удалось отобразить текст ошибки"}
          </Code>
        </Box>
      )}
    </Alert.Root>
  )
}
