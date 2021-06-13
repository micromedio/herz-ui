import { createContext, useContext } from "react"

interface SubNavigationMenuContextData {
  isCollapsed: boolean
}

export const SubNavigationMenuContext =
  createContext<SubNavigationMenuContextData>({
    isCollapsed: false,
  })

export const useSubNavigationMenu = (): SubNavigationMenuContextData => {
  return useContext(SubNavigationMenuContext)
}
