import type { Option } from "./Select"

type convertToOptionsConfig<T extends object> = {
  labelKey: keyof T
  valueKey: keyof T
}

// export function convertArrayToOptions<T extends object>(
//   array: T[],
//   { labelKey, valueKey }: convertToOptionsConfig<T>
// ): Option[] {
//   return array.map((item) => ({
//     value: String(item[valueKey]),
//     label: String(item[labelKey]),
//   }))
// }

export function convertToOptions<T extends object>(
  item: T,
  { labelKey, valueKey }: convertToOptionsConfig<T>
): Option {
  return {
    label: String(item[labelKey]),
    value: String(item[valueKey]),
  }
}
