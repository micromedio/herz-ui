import { createContext, useContext } from "react"

export interface TabContext {
  index: number
  openIndex?: number
  toggleOpen: (index: number) => void
}

export const TabContext = createContext<TabContext | null>(null)

export function useTabContext() {
  const context = useContext(TabContext)
  if (!context) {
    throw new Error("Tab.Link needs to be wrapped in an Tab component")
  }
  return context
}
