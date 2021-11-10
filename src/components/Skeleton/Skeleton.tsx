/** @jsxImportSource theme-ui */
import React from "react"

export interface SkeletonProps {
  className?: string
  variant?: "circle" | "text" | "rect"
  width?: number | string
  height?: number | string
}

const Skeleton = ({
  className,
  variant = "rect",
  width = "100%",
  height = "auto",
}: SkeletonProps) => {
  const keyframes = {
    "@keyframes pulse": {
      "0%": {
        opacity: 1,
      },
      "50%": {
        opacity: 0.4,
      },
      "100%": {
        opacity: 1,
      },
    },
  }

  return (
    <span
      className={className}
      sx={{
        display: "block",
        height,
        width,
        backgroundColor: "text.alpha.90",
        borderRadius: 1,

        ...keyframes,
        animation: "pulse 1.5s ease-in-out 0.5s infinite",

        ...(variant === "circle" && {
          borderRadius: "50%",
        }),
        ...(variant === "text" && {
          height: "auto",
          transform: "scale(1, 0.70)",
          ":before": {
            content: '"\\00a0"',
          },
        }),
      }}
    />
  )
}

export default Skeleton
