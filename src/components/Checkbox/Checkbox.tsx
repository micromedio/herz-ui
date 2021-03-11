/** @jsxRuntime classic /*
/** @jsx jsx */
import { jsx, Label } from "theme-ui"
import * as React from "react"
import Icon from "../Icon/Icon"

export interface ICheckboxProps {
  checked?: boolean
  indeterminate?: boolean
  disabled?: boolean
  label?: string
  name?: string
  onChange?(event: React.ChangeEvent<HTMLInputElement>): void
}

const stateStyles = {
  resting: {
    backgroundColor: "text.alpha.95",
  },
  hover: {
    backgroundColor: "text.90",
  },
  active: {
    backgroundColor: "text.90",
  },
  filled: {
    backgroundColor: "secondary.0",
  },
}

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
    <div
      sx={{
        display: "inline-flex",
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
        name={name}
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
          color: "#fff",
          pointerEvents: "none",
        }}
      >
        {(checked && <Icon name="IconCheck" size={12} stroke={4} />) ||
          (indeterminate && <Icon name="IconMinus" size={12} stroke={4} />) ||
          null}
      </div>

      {label && (
        <Label
          sx={{
            marginLeft: 2,
            width: "auto",
            cursor: disabled ? "auto" : "pointer",
          }}
          htmlFor={name}
        >
          {label}
        </Label>
      )}
    </div>
  )
}
