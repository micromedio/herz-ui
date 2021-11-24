/** @jsxImportSource theme-ui */
import React, { HTMLAttributes } from "react"
import { keyframes } from "@emotion/react"

const indeterminate1 = keyframes`
  0% {
    left: -35%;
    right: 100%;
  }
  60% {
    left: 100%;
    right: -90%;
  }
  100% {
    left: 100%;
    right: -90%;
  }
`

const indeterminate2 = keyframes`
  0% {
    left: -200%;
    right: 100%;
  }
  60% {
    left: 107%;
    right: -8%;
  }
  100% {
    left: 107%;
    right: -8%;
  }
`

export interface LinearProgressProps {
  className?: HTMLAttributes<HTMLDivElement>["className"]

  /** LinearProgress color */
  color?: "primary" | "secondary" | "success" | "warning"

  /** LinearProgress height */
  height?: number

  /** Represents the progress (between 0 and 1) for LinearProgress, the default value is undefined and it renders an animated and indeterminate LinearProgress. */
  progress?: number
}

const LinearProgress = React.forwardRef<HTMLDivElement, LinearProgressProps>(
  function LinearProgressComponent(
    {
      className,
      color = "secondary",
      height = 4,
      progress,
    }: LinearProgressProps,
    ref
  ) {
    return (
      <div
        ref={ref}
        sx={{
          backgroundColor: "text.90",
          position: "relative",
          height,
          overflow: "hidden",
          width: "100%",
        }}
        className={className}
      >
        {!progress && (
          <div
            sx={{
              animation: `${indeterminate1} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite`,
              backgroundColor: color,
              borderRadius: "2px",
              bottom: 0,
              height,
              left: 0,
              position: "absolute",
              top: 0,
              transformOrigin: "left",
              transition: "transform 0.2s linear",
            }}
          />
        )}
        <div
          sx={{
            animation: !progress
              ? `${indeterminate2} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite`
              : undefined,
            backgroundColor: color,
            borderRadius: "2px",
            bottom: 0,
            height,
            left: 0,
            position: "absolute",
            top: 0,
            transformOrigin: "left",
            transition: "transform 0.2s linear",
            width: progress
              ? `calc(${Math.min(1, progress)} * 100%)`
              : undefined,
          }}
        />
      </div>
    )
  }
)

export default LinearProgress
