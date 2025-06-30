import "@styles/App.css"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import {
  QueryProvider,
  RouterProvider,
  StylesProvider,
} from "./providers"

function App() {
  return (
    <StylesProvider>
      <QueryProvider>
        <RouterProvider />
        {import.meta.env.MODE === "development" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryProvider>
    </StylesProvider>
  )
}

export default App
