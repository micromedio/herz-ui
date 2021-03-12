import React from "react"
import { Meta, Story } from "@storybook/react/types-6-0"
import { UploadProps } from "rc-upload"

import Uploader from "./Uploader"

export default {
  title: "Design System/Uploader",
  component: Uploader,
} as Meta

const Template: Story<UploadProps> = (props) => {
  return <Uploader {...props} />
}

export const Default = Template.bind({})

Default.args = {
  action: "/upload.do",
  type: "drag",
  accept: ".png",
  beforeUpload(file) {
    console.log("beforeUpload", file.name)

    return file.name
  },
  onStart: (file) => {
    console.log("onStart", file.name)
  },
  onSuccess(file) {
    console.log("onSuccess", file)
  },
  onProgress(step, file) {
    console.log("onProgress", Math.round(step.percent), file.name)
  },
  onError(error) {
    console.log("onerroror", error)
  },
}
