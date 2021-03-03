/** @jsxRuntime classic /
/** @jsx jsx */
import { jsx } from "theme-ui"
import * as TablerIcons from "@tabler/icons"
import React, { SVGAttributes } from "react"

type IconType = typeof import("@tabler/icons")

export interface IconProps {
  name: keyof IconType

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
