/** @jsxRuntime classic /*
/** @jsx jsx */
import { Flex, jsx, Text } from "theme-ui"
import React, { useEffect, useState } from "react"
import { DropzoneOptions, useDropzone } from "react-dropzone"

import { Button } from ".."

type PreviewFile = File & { preview: string }

export interface IUploaderProps extends DropzoneOptions {
  multiple?: boolean
  name?: string
}

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

/**
 * Component responsible for rendering a file input that accept files through dragging or browsing.
 *
 * The form that uses the Uploader must provide the logic to upload the file(s).
 * Generally it is done through a form submit handler.
 *
 * The accepted files can be picked up through a controlled `files` prop
 * or the input element value.
 */
const Uploader = React.forwardRef<HTMLInputElement, IUploaderProps>(
  (
    {
      accept = "image/*",
      multiple = false,
      maxFiles,
      minSize,
      maxSize = 1048576,
      name,
      children,
    },
    ref
  ) => {
    const [files, setFiles] = useState<PreviewFile[]>([])
    const [isPreviewOpen, setIsPreviewOpen] = useState(false)
    const {
      fileRejections,
      isDragActive,
      isDragReject,
      getRootProps,
      getInputProps,
    } = useDropzone({
      accept,
      multiple,
      maxFiles,
      minSize,
      maxSize,
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
      <Flex
        key={file.name}
        sx={{
          paddingX: 3,
          paddingY: 2,
          borderRadius: 2,
          alignItems: "center",
          backgroundColor: "secondary.alpha.95",
        }}
      >
        <Text
          sx={{
            fontSize: 13,
            color: "secondary.0",
            textOverflow: "ellipsis",
            verticalAlign: "middle",
            overflow: "hidden",
          }}
        >
          {file.name}
        </Text>
      </Flex>
    ))

    useEffect(
      () => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach((file) => URL.revokeObjectURL(file.preview))
      },
      [files]
    )

    return (
      <div
        sx={{
          display: "flex",
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
          <input
            type="file"
            onChange={(event) => console.log(event)}
            name={name}
            ref={ref}
            {...getInputProps()}
          />
          {children}
        </div>
        {isDragReject && <Text>File type not accepted, sorry!</Text>}
        {files.length > 0 && (
          <Flex
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              alignSelf: "stretch",
              marginTop: 3,
              marginBottom: 2,
            }}
          >
            <Text
              sx={{
                color: "text.40",
                fontSize: 13,
              }}
            >
              {files.length} files uploaded, 1 uploading...
            </Text>
            <Button
              variant="plain"
              color="secondary"
              onClick={() => setIsPreviewOpen((previous) => !previous)}
            >
              {!isPreviewOpen ? "View & manage files" : "Hide files"}
            </Button>
          </Flex>
        )}

        {isPreviewOpen && (
          <div
            sx={{
              display: "grid",
              gridTemplateColumns: "50% 50%",
              gap: 2,
              alignSelf: "stretch",
            }}
          >
            {thumbs}
          </div>
        )}
      </div>
    )
  }
)

export default Uploader
