/** @jsxImportSource theme-ui */
import React from "react"
import { Meta, Story } from "@storybook/react/types-6-0"
import TableSkeleton from "./TableSkeleton"
import DetailPageSkeleton from "./DetailPageSkeleton"
import SidePanelSkeleton from "./SidePanelSkeleton"

export default {
  title: "Design System/Skeleton Loader",
} as Meta

const TableTemplate: Story = () => {
  return <TableSkeleton />
}

const DetailPageTemplate: Story = () => {
  return (
    <div sx={{ width: "500px" }}>
      <DetailPageSkeleton />
    </div>
  )
}

const SidePanelTemplate: Story = () => {
  return (
    <div sx={{ width: "384px" }}>
      <SidePanelSkeleton />
    </div>
  )
}

export const TableSkeletonTemplate = TableTemplate.bind({})
export const DetailPageSkeletonTemplate = DetailPageTemplate.bind({})
export const SidePanelSkeletonSkeletonTemplate = SidePanelTemplate.bind({})
