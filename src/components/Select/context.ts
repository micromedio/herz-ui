import { createContext } from "react"
import { useSelect } from "./hooks/useSelect"

interface SelectContext {
  index: number
  highlightedIndex: ReturnType<typeof useSelect>["highlightedIndex"]
  selectedItem: ReturnType<typeof useSelect>["selectedItem"]
  selectedItems: ReturnType<typeof useSelect>["selectedItems"]
  multi: boolean
  getItemProps: ReturnType<typeof useSelect>["getItemProps"]
}

export const SelectContext = createContext<SelectContext | null>(null)
