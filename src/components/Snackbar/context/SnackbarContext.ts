import { createContext } from "react"
import { SnackbarProps } from "../Snackbar"
import { SnackbarItemProps } from "./SnackbarItem"

export interface EnqueueSnackbarArguments extends SnackbarProps {
  autoHideDuration?: SnackbarItemProps["autoHideDuration"]
  showClose?: SnackbarItemProps["showClose"]
  isPersistent?: SnackbarItemProps["isPersistent"]
}

export interface SnackbarContext {
  enqueueSnackbar: (props: EnqueueSnackbarArguments) => string
  closeSnackbar: (id?: string) => void

  position: SnackbarProps["position"]
}

export const SnackbarContext = createContext<SnackbarContext | null>(null)
