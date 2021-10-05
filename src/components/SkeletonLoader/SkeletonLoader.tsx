/** @jsxImportSource theme-ui */
import React from "react"
import ContentLoader from "react-content-loader"

export interface SkeletonLoaderProps {
  variant?: string
  width?: string
  height?: string
  radius?: string
  top?: string
  left?: string
}

const SkeletonLoader = ({
  variant,
  width = "50",
  height = "50",
  radius = "4",
  top = "0",
  left = "0",
}: SkeletonLoaderProps) => {
  if (variant === "circle") {
    radius = "50%"
  }
  return (
    <>
      <ContentLoader viewBox={`0 0 ${width} ${height}`}>
        <rect
          x={left}
          y={top}
          rx={radius}
          ry={radius}
          width={width}
          height={height}
        />
      </ContentLoader>
    </>
  )
}

export default SkeletonLoader
