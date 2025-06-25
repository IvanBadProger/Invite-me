import { ChakraProvider } from "@chakra-ui/react"
import { system } from "@chakra-ui/react/preset"

type StylesProviderProps = {
  children: React.ReactNode
}

export const StylesProvider = (props: StylesProviderProps) => {
  const { children } = props

  return <ChakraProvider value={system}>{children}</ChakraProvider>
}
