export const parseTimeValue = (value: string, max: number): number => {
  if (value === "") return 0
  return Math.max(0, Math.min(max, parseInt(value) || 0))
}

export const formatTimeUnits = (totalMinutes: number | string) => {
  const numericValue = typeof totalMinutes === "string" ? parseInt(totalMinutes) : totalMinutes
  return {
    hours: Math.floor(numericValue / 60),
    minutes: numericValue % 60,
  }
}

export const TIME_CONSTRAINTS = {
  MAX_HOURS: 23,
  MAX_MINUTES: 59,
  MIN_TIME: 0,
} as const
