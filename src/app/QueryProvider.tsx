import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"

type QueryClientProviderProps = {
  children: React.ReactNode
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1 * 60 * 60 * 1000,
    },
  },
})

export const QueryProvider = (props: QueryClientProviderProps) => {
  const { children } = props

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
