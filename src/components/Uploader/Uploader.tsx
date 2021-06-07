/** @jsxRuntime classic /*
/** @jsx jsx */
import { Flex, jsx, Text } from "theme-ui"
import React, { useState } from "react"
import { DropzoneOptions, useDropzone } from "react-dropzone"

import { Button } from ".."
import Icon from "../Icon/Icon"

export interface IUploaderProps extends DropzoneOptions {
  name?: string
  files?: File[]
  onChange?(files: File[]): void
  children: React.ReactNode
}

const stateStyles = {
  resting: {
    backgroundColor: "secondary.alpha.95",
  },
  hover: {
    backgroundColor: "secondary.90",
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
      maxSize = 1_048_576,
      name = "files",
      files = [],
      onChange,
      children,
      ...restProps
    },
    ref
  ) => {
    const [isPreviewOpen, setIsPreviewOpen] = useState(false)
    const {
      isDragActive,
      isDragReject,
      getRootProps,
      getInputProps,
    } = useDropzone({
      accept,
      multiple,
      maxSize,
      ...restProps,

      onDrop: (acceptedFiles) => {
        const newFiles = multiple ? files.concat(acceptedFiles) : acceptedFiles

        onChange?.(newFiles)
      },
    })

    function handleFileRemove(
      event: React.MouseEvent<HTMLButtonElement>
    ): void {
      const fileIndex = event.currentTarget.dataset.index
      if (!fileIndex) return

      const newFiles = files.filter(
        (file, index) => index !== Number(fileIndex)
      )
      onChange?.(newFiles)
    }

    return (
      <div
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          maxWidth: "460px",
          textAlign: "center",
        }}
      >
        <div
          sx={{
            paddingY: 4,
            paddingX: 6,
            border: "1px dashed",
            borderColor: "secondary.40",
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
            name={name}
            ref={ref}
            title="Drag & Drop or browse a file"
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
              {files.length} files selected
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

        <div
          sx={{
            display: "grid",
            opacity: isPreviewOpen ? 1 : 0,
            visibility: isPreviewOpen ? "visible" : "hidden",
            maxHeight: isPreviewOpen ? "9999px" : 0,
            gridTemplateColumns: "1fr 1fr",
            gap: 2,
            alignSelf: "stretch",
            transition: "all.2s",
          }}
        >
          {files.map(({ name }, index) => (
            <Flex
              key={index}
              sx={{
                paddingX: 3,
                paddingY: 2,
                borderRadius: 2,
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "secondary.alpha.95",
              }}
            >
              <span
                sx={{
                  fontSize: 13,
                  color: "secondary.0",
                  textOverflow: "ellipsis",
                  verticalAlign: "middle",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {name}
              </span>
              <button
                sx={{
                  display: "inline-flex",
                  ml: 2,
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  padding: 0,
                }}
                data-index={index}
                title="Remove file"
                onClick={handleFileRemove}
              >
                <Icon
                  sx={{
                    color: "text.40",
                    pointerEvents: "none",
                  }}
                  name="IconX"
                  size={16}
                />
              </button>
            </Flex>
          ))}
        </div>
      </div>
    )
  }
)

export default Uploader
