/** @jsxRuntime classic /
/** @jsx jsx */
import { createElement } from "react"
import * as TablerIcons from "@tabler/icons"

type IconType = typeof import("@tabler/icons")

export interface IconProps {
  name: string

  // set custom `width` and `height`
  size?: number

  // set `stroke` color
  color?: string

  // set the thickness stroke
  stroke?: number
}

const Icon = ({
  name = "IconAlertTriangle",
  size = 20,
  color = "blue",
  stroke = 2,
}: IconProps) => {
  return createElement(TablerIcons[name as keyof IconType], {
    size,
    color,
    stroke,
  })
}

export default Icon
