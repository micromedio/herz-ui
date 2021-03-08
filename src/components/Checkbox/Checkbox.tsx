/** @jsxRuntime classic /*
/** @jsx jsx */
import { jsx, Label } from "theme-ui"
import * as React from "react"

export interface ICheckboxProps {
  checked?: boolean
  indeterminate?: boolean
  disabled?: boolean
  label?: string
  name?: string
  onChange?(event: React.ChangeEvent<HTMLInputElement>): void
}

/** @TODO add colors to theme file */
const stateStyles = {
  resting: {
    backgroundColor: "#F4F4F4",
  },
  hover: {
    backgroundColor: "#E8E8E9",
  },
  active: {
    backgroundColor: "#E8E8E9",
  },
  filled: {
    backgroundColor: "#0082FC",
  },
}

const indeterminateSvg = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="20" height="20" rx="4" fill="none" />
    <path
      d="M6 10H10.2667H14"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const checkedSvg = (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.5 6L5 8.5L10 3.5"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function Checkbox(props: ICheckboxProps) {
  const {
    checked = false,
    disabled = false,
    indeterminate = false,
    label,
    name,
    onChange,
    ...restProps
  } = props

  return (
    <React.Fragment>
      <Label
        htmlFor={name}
        sx={{
          position: "relative",
          alignItems: "center",
          opacity: disabled ? 0.4 : 1,
          cursor: disabled ? "auto" : "pointer",
        }}
      >
        <input
          {...restProps}
          type="checkbox"
          id={name}
          title={name}
          onChange={(!disabled && onChange) || undefined}
          ref={(input) => {
            if (input) {
              input.checked = checked
              input.indeterminate = indeterminate
              input.disabled = disabled
            }
          }}
          sx={{
            position: "relative",
            width: 20,
            height: 20,
            marginRight: 2,
            appearance: "none",
            borderRadius: 1,
            border: "2px solid transparent",
            outline: "none",
            transition: "all 0.2s",
            cursor: disabled ? "auto" : "pointer",

            ...(checked || indeterminate
              ? stateStyles.filled
              : stateStyles.resting),

            "&:hover": {
              ...(checked || indeterminate
                ? stateStyles.filled
                : stateStyles.hover),
            },

            "&:focus": {
              ...(checked || indeterminate
                ? stateStyles.filled
                : stateStyles.active),
            },

            "&:checked": {
              background: "#0082FC",
            },

            "&:checked ~ div, &:indeterminate ~ div": {
              visibility: "visible",
              opacity: 1,
            },
          }}
          role="checkbox"
        />
        <div
          sx={{
            position: "absolute",
            visibility: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "20px",
            width: "20px",
            left: "0",
            top: "0",
            cursor: "pointer",
          }}
        >
          {(checked && checkedSvg) ||
            (indeterminate && indeterminateSvg) ||
            null}
        </div>
        {label && label}
      </Label>
    </React.Fragment>
  )
}
