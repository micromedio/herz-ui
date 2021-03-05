/** @jsxRuntime classic /*
/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"

import MultiSelector from "./MultiSelector"
import Selector from "./Selector"

export interface DropdownSelectProps {
  /** Label text to be placed before the element */
  label?: string
  /** Options to be selected */
  options: Array<Option>
  /** The value of the `input` element, required for a controlled component */
  value?: Option
  /** Wether the component is disabled or not */
  disabled?: boolean
  multi?: boolean
  selectedItems?: Array<Option>
  /** Callback fired when the value is changed */
  onChange?: (selectedItems: Array<Option>) => void
}

export type Option = {
  value: string | number
  label: string
}

/**
 * Component responsible for rendering a select drop-down from given options
 *
 * A drop-down list is a control element that allows the user to choose one (or multiple) value(s) from a list.
 */
const DropdownSelect = (props: DropdownSelectProps) => {
  const { multi } = props
  return multi ? <MultiSelector {...props} /> : <Selector {...props} />
}

export default DropdownSelect
