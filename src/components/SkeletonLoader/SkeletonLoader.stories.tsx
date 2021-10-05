/** @jsxImportSource theme-ui */
import React from "react"
import { Meta, Story } from "@storybook/react/types-6-0"
import SkeletonLoader from "./SkeletonLoader"

export default {
  title: "Design System/Skeleton Loader",
} as Meta

const SkeletonTemplate: Story = () => {
  return (
    <>
      <div sx={{ display: "flex", maxWidth: "600px", height: "50px" }}>
        <SkeletonLoader width="230" height="20" />
        <SkeletonLoader width="130" height="20" left="10" />
      </div>
      <div sx={{ display: "flex", maxWidth: "600px", height: "50px" }}>
        <SkeletonLoader width="230" height="20" />
        <SkeletonLoader width="130" height="20" left="10" />
      </div>
      <div sx={{ display: "flex", maxWidth: "600px", height: "30px" }}>
        <SkeletonLoader width="30" height="30" variant="circle" />
        <SkeletonLoader width="230" height="30" left="20" />
      </div>
    </>
  )
}

export const Skeleton = SkeletonTemplate.bind({})
