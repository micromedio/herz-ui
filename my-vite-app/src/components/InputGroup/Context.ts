import { createContext } from "react"

export const InputGroupContext = createContext<{
  index: number
  isFirst: boolean
  isLast: boolean
} | null>(null)
