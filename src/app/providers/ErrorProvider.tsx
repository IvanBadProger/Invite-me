import { ROUTES } from "@/shared/lib/constants"
import { Button, Center, Code, Text } from "@chakra-ui/react"
import { ErrorBoundary, type FallbackProps } from "react-error-boundary"
import { Link } from "react-router"

export function GlobalErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <Center role="alert">
      <Text>Что-то пошло не так, я аж в шоке</Text>
      <Code>{error.message}</Code>
      <Button type="button" onClick={resetErrorBoundary}>
        Попробовать снова
      </Button>
      <Button asChild type={undefined}>
        <Link to={ROUTES.HOME}>Перети на главную</Link>
      </Button>
    </Center>
  )
}

export const ErrorProvider = ({ children }: React.PropsWithChildren) => {
  return <ErrorBoundary FallbackComponent={GlobalErrorFallback}>{children}</ErrorBoundary>
}
