import "@styles/App.css"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { StylesProvider } from "./styles/StylesProvider"
import { RouterProvider } from "./RouterProvider"
import { QueryProvider } from "./QueryProvider"

function App() {
  return (
    <StylesProvider>
      <QueryProvider>
        <RouterProvider />
        {import.meta.env.MODE === "develop" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryProvider>
    </StylesProvider>
  )
}

export default App
