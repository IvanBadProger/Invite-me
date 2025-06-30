import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

type QueryClientProviderProps = {
  children: React.ReactNode
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1 * 60 * 60 * 1000,
      retry: import.meta.env.MODE === "production" ? 2 : false,
      refetchOnWindowFocus: false,
    },
  },
})

export const QueryProvider = (props: QueryClientProviderProps) => {
  const { children } = props

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
