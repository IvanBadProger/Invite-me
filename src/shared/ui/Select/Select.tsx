import {
  Select as ChakraSelect,
  type ListCollection,
  Portal,
} from "@chakra-ui/react"

type SelectProps = {
  options: ListCollection
  label: string
}

export const Select = (props: SelectProps) => {
  const { options, label } = props

  return (
    <ChakraSelect.Root collection={options} size="sm" width="320px">
      <ChakraSelect.HiddenSelect />
      <ChakraSelect.Label>{label}</ChakraSelect.Label>
      <ChakraSelect.Control>
        <ChakraSelect.Trigger>
          <ChakraSelect.ValueText placeholder={label} />
        </ChakraSelect.Trigger>
        <ChakraSelect.IndicatorGroup>
          <ChakraSelect.Indicator />
        </ChakraSelect.IndicatorGroup>
      </ChakraSelect.Control>
      <Portal>
        <ChakraSelect.Positioner>
          <ChakraSelect.Content>
            {options.items.map((option) => (
              <ChakraSelect.Item item={option} key={option.value}>
                {option.label}
                <ChakraSelect.ItemIndicator />
              </ChakraSelect.Item>
            ))}
          </ChakraSelect.Content>
        </ChakraSelect.Positioner>
      </Portal>
    </ChakraSelect.Root>
  )
}
