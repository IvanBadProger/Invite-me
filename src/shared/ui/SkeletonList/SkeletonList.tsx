import { Skeleton } from "@chakra-ui/react"

type Props = {
  items?: number
}

export const SkeletonList = ({ items = 4 }: Props) => {
  return (
    <>
      {Array.from({ length: items }, (_, index) => (
        <Skeleton height="150px" width={"sm"} borderRadius="lg" key={index} />
      ))}
    </>
  )
}
