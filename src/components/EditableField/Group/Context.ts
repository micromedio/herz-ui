import { createContext, FocusEvent, RefObject } from "react"

export interface EditableFieldGroupContextArguments {
  isFocused?: boolean
  hasChanged?: boolean
  register?: ({
    name,
    ref,
    reset,
    disableActionsOnBlur,
  }: {
    disableActionsOnBlur?: boolean
    name: string
    ref: RefObject<HTMLElement>
    reset: () => void
  }) => void
  onChange?: ({
    name,
    value,
    defaultValue,
  }: {
    name: string
    value: unknown
    defaultValue: unknown
  }) => void
  onFocus?: (event: FocusEvent<HTMLElement>) => void
  onBlur?: (event: FocusEvent<HTMLElement>) => void
  onSave?: () => void
  onReset?: () => void
  status?: "error" | "success" | "loading"
}

export const EditableFieldGroupContext =
  createContext<EditableFieldGroupContextArguments>({})
