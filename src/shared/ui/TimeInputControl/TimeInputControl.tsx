import { formatTimeString } from "@/shared/lib"
import { HStack, Text } from "@chakra-ui/react"
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  type PathValue,
} from "react-hook-form"
import { TimeUnit } from "./TimeUnit"
import { formatTimeUnits, TIME_CONSTRAINTS } from "./timeUtils"

type TimeInputControlProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  defaultValue?: PathValue<T, Path<T>>
  visiblePreview?: boolean
}

export const TimeInputControl = <T extends FieldValues>({
  control,
  name,
  defaultValue,
  visiblePreview = false,
}: TimeInputControlProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => {
        const { hours, minutes } = formatTimeUnits(value)
        const totalMinutes = parseInt(value)

        const updateTime = (newHours: number, newMinutes: number) => {
          onChange((newHours * 60 + newMinutes).toString())
        }

        const createTimeUpdater = (unit: "hours" | "minutes") => (newValue: number) => {
          updateTime(unit === "hours" ? newValue : hours, unit === "minutes" ? newValue : minutes)
        }

        const createIncrementHandler = (unit: "hours" | "minutes") => () => {
          const current = unit === "hours" ? hours : minutes
          const max = unit === "hours" ? TIME_CONSTRAINTS.MAX_HOURS : TIME_CONSTRAINTS.MAX_MINUTES
          const newValue = (current + 1) % (max + 1)
          createTimeUpdater(unit)(newValue)
        }

        const createDecrementHandler = (unit: "hours" | "minutes") => () => {
          const current = unit === "hours" ? hours : minutes
          const max = unit === "hours" ? TIME_CONSTRAINTS.MAX_HOURS : TIME_CONSTRAINTS.MAX_MINUTES
          const newValue = current === 0 ? max : current - 1
          createTimeUpdater(unit)(newValue)
        }

        return (
          <HStack
            align="center"
            gap={3}
            // width="full"
            p={3}
            bg="white"
            borderRadius="lg"
            border="1px solid"
            borderColor="gray.100"
            boxShadow="sm"
            _hover={{
              borderColor: "blue.100",
              boxShadow: "md",
            }}
            transition="all 0.2s"
          >
            <TimeUnit
              value={hours}
              max={TIME_CONSTRAINTS.MAX_HOURS}
              unitLabel="ч"
              onIncrement={createIncrementHandler("hours")}
              onDecrement={createDecrementHandler("hours")}
              onChange={createTimeUpdater("hours")}
              disabled={totalMinutes === 0}
              visibleButtons={false}
            />

            <Text fontSize="lg" as={"span"} color="gray.300" fontWeight="bold">
              :
            </Text>

            <TimeUnit
              value={minutes}
              max={TIME_CONSTRAINTS.MAX_MINUTES}
              unitLabel="мин"
              onIncrement={createIncrementHandler("minutes")}
              onDecrement={createDecrementHandler("minutes")}
              onChange={createTimeUpdater("minutes")}
              disabled={totalMinutes === 0}
              visibleButtons={false}
            />

            {visiblePreview && (
              <Text
                fontSize="lg"
                color="blue.600"
                fontWeight="bold"
                ml={2}
                px={3}
                py={2}
                bg="blue.50"
                borderRadius="md"
                minW="100px"
                textAlign="center"
              >
                {formatTimeString(value)}
              </Text>
            )}
          </HStack>
        )
      }}
    />
  )
}
