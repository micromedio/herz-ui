import * as TablerIcons from "@tabler/icons-react"
import React, { SVGAttributes } from "react"

type IconType = typeof import("@tabler/icons-react")

export interface IconProps {
  name: keyof Omit<IconType, "iconsList" | "icons" | "createReactComponent">

  // set custom `width` and `height`
  size?: number

  // set the thickness stroke
  stroke?: number
  className?: SVGAttributes<SVGElement>["className"]
  style?: SVGAttributes<SVGElement>["style"]
}

const Icon = ({
  name = "IconAlertTriangle",
  size = 20,
  stroke = 2,
  className,
  style,
}: IconProps) => {
  const Component = TablerIcons[name]

  if (Component)
    return (
      <Component
        size={size}
        stroke={stroke}
        className={className}
        style={style}
      />
    )
  return <React.Fragment />
}

export default Icon
