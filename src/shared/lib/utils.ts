export const formatTimeString = (totalMinutes: number) => {
  const hrs = Math.floor(totalMinutes / 60)
  const mins = totalMinutes % 60

  if (hrs === 0 && mins === 0) return "0 мин"
  if (hrs === 0) return `${mins} мин`
  if (mins === 0) return `${hrs} ч`
  return `${hrs}ч ${mins}мин`
}
