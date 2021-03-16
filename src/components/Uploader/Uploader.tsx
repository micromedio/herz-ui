/** @jsxRuntime classic /*
/** @jsx jsx */
import { Flex, jsx, Text } from "theme-ui"
import React, { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"

import { Button } from ".."

type PreviewFile = File & { preview: string }

export interface IUploaderProps {
  multiple?: boolean
}

const Uploader = React.forwardRef<HTMLInputElement, IUploaderProps>(
  ({ multiple = false, children }, ref) => {
    const [files, setFiles] = useState<PreviewFile[]>([])
    const [isPreviewOpen, setIsPreviewOpen] = useState(false)
    const {
      fileRejections,
      isDragActive,
      isDragReject,
      getRootProps,
      getInputProps,
    } = useDropzone({
      accept: "image/*",
      multiple,
      maxFiles: 2,
      minSize: 0,
      maxSize: 1048576,
      onDrop: (acceptedFiles) => {
        const mapped = acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )

        setFiles((previous) => (multiple ? previous.concat(mapped) : mapped))
      },
    })

    console.log(fileRejections)
    const thumbs = files.map((file) => (
      <div key={file.name}>
        <Text>{file.name}</Text>
      </div>
    ))

    useEffect(
      () => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach((file) => URL.revokeObjectURL(file.preview))
      },
      [files]
    )

    const stateStyles = {
      resting: {
        backgroundColor: "secondary.alpha.95",
      },
      hover: {
        backgroundColor: "secondary.90",
      },
      active: {
        backgroundColor: "secondary.90",
      },
      filled: {
        backgroundColor: "secondary.0",
      },
    }

    return (
      <div
        sx={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <div
          sx={{
            paddingY: 4,
            paddingX: 6,
            border: "1px dashed #99CDFE",
            borderRadius: " 12px",
            cursor: "pointer",
            transition: "all .2s linear",

            ...stateStyles[isDragActive ? "hover" : "resting"],

            "&:hover": {
              ...stateStyles.hover,
            },
          }}
          {...getRootProps({ className: "dropzone" })}
        >
          <input ref={ref} {...getInputProps()} />
          {children}
        </div>
        {isDragReject && <Text>File type not accepted, sorry!</Text>}
        {files.length > 0 && (
          <Flex
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              alignSelf: "stretch",
            }}
          >
            <Text>{files.length} files uploaded, 1 uploading...</Text>
            <Button
              variant="plain"
              color="secondary"
              onClick={() => setIsPreviewOpen((previous) => !previous)}
            >
              {!isPreviewOpen ? "View & manage files" : "Hide files"}
            </Button>
          </Flex>
        )}

        {isPreviewOpen && <aside>{thumbs}</aside>}
      </div>
    )
  }
)

export default Uploader
