import type { IconProps } from "@chakra-ui/react"
import { Icon } from "@chakra-ui/react"
import type { LucideIcon } from "lucide-react"

interface DecorativeIconProps extends Omit<IconProps, "as"> {
  icon: LucideIcon
  size?: "sm" | "md" | "lg"
  animation?: "float" | "pulse"
}

export const DecorativeIcon = ({
  icon,
  size = "md",
  animation = "float",
  ...props
}: DecorativeIconProps) => {
  const sizeMap = {
    sm: 4,
    md: 6,
    lg: 8,
  }

  const animationMap = {
    float: "float",
    pulse: "pulse",
  }

  return (
    <Icon
      as={icon}
      animation={animationMap[animation]}
      boxSize={sizeMap[size]}
      position="absolute"
      aria-hidden="true"
      {...props}
    />
  )
}
