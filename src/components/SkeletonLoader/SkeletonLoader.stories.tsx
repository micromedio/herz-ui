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
      <SkeletonLoader {...props} />
    </>
  )
}

export const SkeletonText = SkeletonTemplate.bind({})
export const SkeletonCircle = SkeletonTemplate.bind({})

SkeletonText.args = {
  width: 60,
  height: 20,
  left: 20,
  top: 0,
  variant: "text",
}

SkeletonCircle.args = {
  width: 80,
  height: 80,
  left: 0,
  top: 0,
  variant: "circle",
}
