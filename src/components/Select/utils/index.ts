import React from "react"
import { toArray } from "../../../helpers/utils"
import { SelectOptionType } from "../Select"

export function getDataFromChildren(nodes: React.ReactNode) {
  return (
    toArray(nodes)
      // eslint-disable-next-line unicorn/no-array-reduce
      .reduce<Array<React.ReactNode>>((accumulator, node) => {
        if (Array.isArray(node)) return [...accumulator, ...node]
        return [...accumulator, node]
      }, [])
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
  )
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
