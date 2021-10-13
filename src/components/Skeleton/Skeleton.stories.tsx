/** @jsxImportSource theme-ui */
import React from "react"
import { Meta, Story } from "@storybook/react/types-6-0"
import Skeleton, { SkeletonProps } from "./Skeleton"

export default {
  title: "Design System/Skeleton",
} as Meta

const SkeletonTemplate: Story<SkeletonProps> = (props) => (
  <Skeleton {...props} />
)

export const SkeletonRectangle = SkeletonTemplate.bind({})
SkeletonRectangle.args = {
  width: 200,
  height: 50,
  variant: "rect",
}

export const SkeletonCircle = SkeletonTemplate.bind({})
SkeletonCircle.args = {
  width: 50,
  height: 50,
  variant: "circle",
}

export const SkeletonText = SkeletonTemplate.bind({})
SkeletonText.args = {
  width: "100%",
  variant: "text",
}

const SkeletonTextTemplate: Story = () => {
  return (
    <div
      sx={{
        display: "grid",
        gap: 1,
        width: 500,
        "> div": {
          display: "flex",
          gap: 1,
        },
      }}
    >
      <div sx={{ variant: "text.heading1" }}>
        <span>Heading 1</span> <Skeleton variant="text" width={100} />
      </div>
      <div sx={{ variant: "text.heading2" }}>
        <span>Heading 2</span> <Skeleton variant="text" width={100} />
      </div>
      <div sx={{ variant: "text.heading3" }}>
        <span>Heading 3</span> <Skeleton variant="text" width={100} />
      </div>
      <div sx={{ variant: "text.heading4" }}>
        <span>Heading 4</span> <Skeleton variant="text" width={100} />
      </div>
      <div sx={{ variant: "text.body1" }}>
        <span>Body 1</span> <Skeleton variant="text" width={100} />
      </div>
      <div sx={{ variant: "text.body2" }}>
        <span>Body 2</span> <Skeleton variant="text" width={100} />
      </div>
      <div sx={{ variant: "text.body3" }}>
        <span>Body 3</span> <Skeleton variant="text" width={100} />
      </div>
      <div sx={{ variant: "text.caption" }}>
        <span>Caption</span> <Skeleton variant="text" width={100} />
      </div>
      <div sx={{ variant: "text.button1" }}>
        <span>Button 1</span> <Skeleton variant="text" width={100} />
      </div>
    </div>
  )
}

export const SkeletonTextExamples = SkeletonTextTemplate.bind({})
SkeletonTextExamples.args = {}
