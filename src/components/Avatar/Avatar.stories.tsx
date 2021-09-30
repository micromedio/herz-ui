import React from "react"
import Avatar, { AvatarProps } from "./Avatar"
import { Meta, Story } from "@storybook/react/types-6-0"
import albertEinstein from "../../assets/albert_einstein.webp"

export default {
  title: "Design System/Avatar",
  component: Avatar,
} as Meta

const Template: Story<AvatarProps> = (props) => <Avatar {...props} />

const MultiSizes: Story<Array<AvatarProps>> = (props: Array<AvatarProps>) => {
  return (
    <div style={{ display: "flex", gap: 16 }}>
      <Avatar {...props} alt="Albert Einstein" size={16} src={albertEinstein} />
      <Avatar {...props} alt="Albert Einstein" size={32}>
        AE
      </Avatar>
      <Avatar {...props} alt="Albert Einstein" size={64} />
      <Avatar {...props} size={128} />
    </div>
  )
}

// Each story then reuses that template
export const Example = Template.bind({})

Example.args = {
  alt: "Albert Einstein",
  src: albertEinstein,
}

export const WithoutSourceOrChildren = Template.bind({})
WithoutSourceOrChildren.args = {
  alt: "Albert Einstein",
}

export const WithoutSourceAndWithChildren = Template.bind({})
WithoutSourceAndWithChildren.args = {
  alt: "Albert Einstein",
  children: "AE",
}

export const DiferentSizes = MultiSizes.bind({})
