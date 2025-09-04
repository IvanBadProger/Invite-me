import { Button, HStack, Input, InputGroup } from "@chakra-ui/react"
import { Minus, Plus } from "lucide-react"
import { parseTimeValue } from "./timeUtils"

interface TimeUnitProps {
  value: number
  max: number
  unitLabel: string
  onIncrement: () => void
  onDecrement: () => void
  onChange: (value: number) => void
  disabled?: boolean
  visibleButtons?: boolean
}

export const TimeUnit = ({
  value,
  max,
  unitLabel,
  onIncrement,
  onDecrement,
  onChange,
  disabled = false,
  visibleButtons = true,
}: TimeUnitProps) => (
  <HStack gap={1}>
    {visibleButtons && (
      <Button
        size="sm"
        variant="ghost"
        onClick={onDecrement}
        disabled={disabled}
        p={1}
        minW="8"
        h="8"
        borderRadius="md"
        colorScheme="blue"
        _hover={{ bg: "blue.50" }}
        _active={{ bg: "blue.100" }}
      >
        <Minus size={14} />
      </Button>
    )}

    <InputGroup endElement={unitLabel}>
      <Input
        value={value.toString().padStart(2, "0")}
        onChange={(e) => onChange(parseTimeValue(e.target.value, max))}
        type="number"
        min={0}
        max={max}
        textAlign="center"
        size="sm"
        p={2}
        variant="flushed"
        bg="gray.50"
        border="none"
        fontWeight="medium"
        fontSize="md"
        onFocus={(e) => e.target.select()}
        _focus={{
          bg: "blue.50",
          border: "1px solid",
          borderColor: "blue.200",
        }}
      />
    </InputGroup>

    {visibleButtons && (
      <Button
        size="sm"
        variant="ghost"
        onClick={onIncrement}
        p={1}
        minW="8"
        h="8"
        borderRadius="md"
        colorScheme="blue"
        _hover={{ bg: "blue.50" }}
        _active={{ bg: "blue.100" }}
      >
        <Plus size={14} />
      </Button>
    )}

    {/* <Text fontSize="sm" color="gray.500" fontWeight="medium">
      {unitLabel}
    </Text> */}
  </HStack>
)
