/** @jsxImportSource theme-ui */
import React from "react"
import { Meta, Story } from "@storybook/react/types-6-0"
import SkeletonLoader, { SkeletonLoaderProps } from "./SkeletonLoader"

export default {
  title: "Design System/Skeleton Loader",
} as Meta

const SkeletonTemplate: Story<SkeletonLoaderProps> = (props) => {
  return (
    <>
      <div sx={{ display: "flex", maxWidth: "600px", height: "50px" }}>
        <SkeletonLoader {...props} />
      </div>
    </>
  )
}

export const SkeletonText = SkeletonTemplate.bind({})
export const SkeletonCircle = SkeletonTemplate.bind({})

SkeletonText.args = {
  width: 230,
  height: 20,
  left: 20,
  top: 20,
  variant: "text",
}

SkeletonCircle.args = {
  width: 80,
  height: 80,
  left: 0,
  top: 0,
  variant: "circle",
}
