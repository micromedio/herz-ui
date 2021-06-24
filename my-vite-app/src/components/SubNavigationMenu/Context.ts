import { createContext, useContext } from "react"

interface SubNavigationMenuContextData {
  isCollapsed: boolean
  collapsedHidden: boolean
}

export const SubNavigationMenuContext =
  createContext<SubNavigationMenuContextData | null>(null)

export const useSubNavigationMenu = (): SubNavigationMenuContextData | null => {
  return useContext(SubNavigationMenuContext)
}
