import React from "react"
import { toArray } from "../../../helpers/utils"
import { SelectOptionType } from "../Select"

function flatten<T = unknown>(array: Array<T>): Array<T> {
  // eslint-disable-next-line unicorn/no-array-reduce
  return array.reduce(
    (accumulator: Array<T>, current) =>
      accumulator.concat(Array.isArray(current) ? flatten(current) : current),
    []
  )
}

export function getDataFromChildren(nodes: React.ReactNode) {
  return flatten(toArray(nodes))
    .map((node) => {
      if (!React.isValidElement(node) || !node.type) {
        return null
      }

      const {
        type: { isSelectOption, isSelectOptionCustom },
        props: { children, value, label: propLabel },
      } = node as React.ReactElement & {
        type: { isSelectOption: boolean; isSelectOptionCustom: boolean }
      }
      if (!isSelectOption && !isSelectOptionCustom) return null

      let label = children
      if (isSelectOptionCustom) label = propLabel || "Custom..."

      return {
        label,
        value: value,
        isCustom: isSelectOptionCustom,
      } as SelectOptionType
    })
    .filter((data) => data) as SelectOptionType[]
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
