import { Toaster } from "@/shared/ui"
import "@styles/App.css"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ErrorProvider, QueryProvider, RouterProvider, StylesProvider } from "./providers"

function App() {
  return (
    <ErrorProvider>
      <StylesProvider>
        <QueryProvider>
          <RouterProvider />
          <Toaster />
          {import.meta.env.MODE === "development" && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryProvider>
      </StylesProvider>
    </ErrorProvider>
  )
}

export default App
