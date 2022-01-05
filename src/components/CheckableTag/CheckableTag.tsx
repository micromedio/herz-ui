/** @jsxImportSource theme-ui */
import React, { forwardRef, HTMLProps } from "react"
import Icon from "../Icon/Icon"

export interface CheckableTagProps
  extends Omit<HTMLProps<HTMLInputElement>, "label" | "ref"> {
  label?: React.ReactNode
}

const stateStyles = {
  resting: {
    backgroundColor: "text.alpha.95",
    color: "text.40",
  },
  hover: {
    backgroundColor: "text.alpha.90",
  },
  active: {
    backgroundColor: "text.alpha.90",
    outline: "none",
  },
  filled: {
    backgroundColor: "secondary.alpha.90",
    color: "secondary",
  },
  filledHover: {
    backgroundColor: "secondary.alpha.85",
    color: "secondary",
    outline: "none",
  },
}

const CheckableTag = forwardRef<HTMLInputElement, CheckableTagProps>(
  function CheckableTag(props: CheckableTagProps, ref) {
    const {
      checked = false,
      disabled = false,
      id,
      label,
      name,
      onChange,
      ...restProps
    } = props

    return (
      <label
        htmlFor={id}
        sx={{
          alignContent: "center",
          alignItems: "center",
          borderRadius: 2,
          cursor: disabled ? "default" : "pointer",
          display: "inline-flex",
          gap: 2,
          opacity: disabled ? 0.4 : 1,
          position: "relative",
          px: 3,
          py: 2,
          variant: "text.heading4",

          ...(checked ? stateStyles.filled : stateStyles.resting),

          "&:hover": {
            ...(!disabled &&
              (checked ? stateStyles.filledHover : stateStyles.hover)),
          },

          "&:focus-within": {
            ...(!disabled &&
              (checked ? stateStyles.filledHover : stateStyles.active)),
          },
        }}
      >
        {label}
        <input
          {...restProps}
          type="checkbox"
          id={id}
          name={name}
          onChange={(!disabled && onChange) || undefined}
          ref={(input) => {
            if (input) {
              input.checked = checked
              input.disabled = disabled

              if (ref) {
                if (typeof ref === "function") {
                  ref(input)
                } else {
                  ref.current = input
                }
              }
            }
          }}
          sx={{
            appearance: "none",
            border: "none",
            borderRadius: 1,
            cursor: disabled ? "default" : "pointer",
            height: 20,
            outline: "none",
            position: "absolute",
            transition: "all 0.2s",
            width: 20,
          }}
          role="checkbox"
        />
        {((checked || !label) && (
          <div
            sx={{
              alignContent: "center",
              alignItems: "center",
              display: "flex",
              minHeight: 20,
              justifyContent: "center",
              visibility: !checked ? "hidden" : undefined,
            }}
          >
            <Icon name="IconCheck" size={12} stroke={4} />
          </div>
        )) ||
          null}
      </label>
    )
  }
)

export default CheckableTag
