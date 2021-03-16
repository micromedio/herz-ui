/** @jsxRuntime classic /*
/** @jsx jsx */
import { jsx, Text } from "theme-ui"

import React from "react"
import { Meta, Story } from "@storybook/react/types-6-0"

import Uploader, { IUploaderProps } from "./Uploader"

export default {
  title: "Design System/Uploader",
  component: Uploader,
} as Meta

const DefaultTemplate: Story<IUploaderProps> = (props) => {
  return (
    <Uploader {...props}>
      <Text>
        Drag & drop or{" "}
        <span
          sx={{
            color: "secondary.0",
          }}
        >
          browse
        </span>{" "}
        the activation file you received by e-mail here
      </Text>
    </Uploader>
  )
}

export const Default = DefaultTemplate.bind({})

Default.args = {
  multiple: true,
}
