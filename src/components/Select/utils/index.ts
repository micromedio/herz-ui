import React from "react"
import { toArray } from "../../../helpers/utils"
import { SelectOption } from "../Select"

export function getDataFromChildren(nodes: React.ReactNode) {
  return toArray(nodes)
    .map((node) => {
      if (!React.isValidElement(node) || !node.type) {
        return null
      }

      const {
        type: { isSelectOption },
        props: { label, children, value },
      } = node as React.ReactElement & {
        type: { isSelectOption: boolean }
      }
      if (!isSelectOption) return null

      // const { label, children, value } = node.props as SelectOptionProps

      return {
        label: label ?? children,
        value: value,
      } as SelectOption
    })
    .filter((data) => data) as SelectOption[]
}

export function isArrayEqual<T = number | string>(
  value: Array<T>,
  other: Array<T>
): boolean {
  const otherSorted = other.slice().sort()

  const isEqual =
    value.length === other.length &&
    value
      .slice()
      .sort()
      .every(function (value, index) {
        return value === otherSorted[index]
      })

  return isEqual
}
