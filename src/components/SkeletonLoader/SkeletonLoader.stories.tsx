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
        <SkeletonLoader width="230px" height="20px" />
        <SkeletonLoader width="130px" height="20px" />
      </div>
      <div sx={{ display: "flex", maxWidth: "600px", height: "50px" }}>
        <SkeletonLoader width="230px" height="20px" />
        <SkeletonLoader width="130px" height="20px" />
      </div>
      <div sx={{ display: "flex", maxWidth: "200px", height: "50px" }}>
        <SkeletonLoader width="50px" height="50px" variant="circle" />
        <SkeletonLoader width="230px" height="20px" top="20px" />
      </div>
    </>
  )
}

export const Skeleton = SkeletonTemplate.bind({})
