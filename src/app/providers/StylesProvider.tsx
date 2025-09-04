import {
  ChakraProvider,
  Container,
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react"

const config = defineConfig({
  conditions: {
    scrollbar: "&::-webkit-scrollbar",
    scrollbarTrack: "&::-webkit-scrollbar-track",
    scrollbarThumb: "&::-webkit-scrollbar-thumb",
  },
  globalCss: {
    ".chakra-skeleton": {
      backgroundColor: "brand.purple.400 !important",
    },
    body: {
      background: "bg.gradient",
    },
  },

  theme: {
    keyframes: {
      float: {
        "0%": { transform: "translateY(0px) rotate(0deg)" },
        "50%": { transform: "translateY(-20px) rotate(10deg)" },
        "100%": { transform: "translateY(0px) rotate(0deg)" },
      },
      shine: {
        "0%": { backgroundPosition: "-200% 0" },
        "100%": { backgroundPosition: "200% 0" },
      },
    },

    tokens: {
      colors: {
        // Градиенты
        "bg.gradient": {
          value: "linear-gradient(135deg, #FFF9F0 0%, #FFFFFF 30%, #F8D7DA 70%, #E2D1F9 100%)",
        },
        "accent.gradient": { value: "linear-gradient(135deg, #F8D7DA, #E2D1F9)" },
        "text.gradient": { value: "linear-gradient(135deg, #F8D7DA, #E2D1F9)" },

        // Декоративные цвета
        "decorative.pink": { value: "#F8D7DA" },
        "decorative.purple": { value: "#E2D1F9" },
        "decorative.blue": { value: "#BFDBFE" },
        "decorative.cream": { value: "#FFF9F0" },

        // Брендовые цвета
        "brand.pink.50": { value: "#FDF2F8" },
        "brand.pink.100": { value: "#FCE7F3" },
        "brand.pink.400": { value: "#F472B6" },
        "brand.pink.500": { value: "#EC4899" },

        "brand.purple.50": { value: "#FAF5FF" },
        "brand.purple.100": { value: "#F3E8FF" },
        "brand.purple.400": { value: "#C084FC" },
        "brand.purple.500": { value: "#A855F7" },

        "brand.blue.300": { value: "#93C5FD" },
        "brand.blue.400": { value: "#60A5FA" },
      },

      animations: {
        float: { value: "float 6s ease-in-out infinite" },
        shine: { value: "shine 3s linear infinite" },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)

export type StylesProviderProps = {
  children: React.ReactNode
}

export const StylesProvider = (props: StylesProviderProps) => {
  const { children } = props
  return (
    <ChakraProvider value={system}>
      <Container fluid>{children}</Container>
    </ChakraProvider>
  )
}
