/** @jsxRuntime classic /*
/** @jsx jsx */
import { jsx } from "theme-ui"
import * as React from "react"
import Upload, { UploadProps } from "rc-upload"

export default function Uploader(props: UploadProps) {
  const { title } = props

  return (
    <Upload
      sx={{
        paddingY: 4,
        paddingX: 6,
        background: "rgba(0, 130, 252, 0.06)",
        border: "1px dashed #99CDFE",
        borderRadius: " 12px",
      }}
      {...props}
      name="test"
      title={title}
      multiple={true}
    >
      Drag & drop or browse
    </Upload>
  )
}
