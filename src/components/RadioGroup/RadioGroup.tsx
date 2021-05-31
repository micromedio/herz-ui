/** @jsxRuntime classic /
/** @jsx jsx */
import { jsx } from "theme-ui"
import React, { ChangeEvent, ReactNode } from "react"
import RadioGroupContext from "./RadioGroupContext"

export interface RadioGroupProps {
  name?: string
  value: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  children?: ReactNode
}

export function RadioGroup({
  name,
  onChange,
  children,
  value,
}: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ name, onChange, value }}>
      {children}
    </RadioGroupContext.Provider>
  )
}
