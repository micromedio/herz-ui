/** @jsxRuntime classic /
/** @jsx jsx */
import { jsx } from "theme-ui"
import React, { ChangeEvent, forwardRef } from "react"

export interface RadioGroupProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void

  children?: React.ReactNode
}

const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(
  function RadioGroup({ onChange, children }: RadioGroupProps) {
    return <div onChange={onChange}>{children}</div>
  }
)

export default RadioGroup
