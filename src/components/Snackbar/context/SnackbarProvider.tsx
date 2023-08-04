/** @jsxImportSource theme-ui */
import { useCallback, useMemo, useState } from "react"
import { SnackbarContext } from "./SnackbarContext"
import SnackbarItem, { SnackbarItemProps } from "./SnackbarItem"

export interface SnackbarProviderProps {
  children: React.ReactNode
  autoHideDuration?: number
  position?: {
    vertical: "top" | "bottom"
    horizontal: "left" | "center" | "right"
  }
}

const SNACKBAR_MARGIN = 3

const SnackbarProvider = ({
  children,
  autoHideDuration = 2000,
  position = { vertical: "bottom", horizontal: "right" },
}: SnackbarProviderProps) => {
  const [snacks, setSnacks] = useState<Array<SnackbarItemProps>>([])

  const closeSnackbar = useCallback<SnackbarContext["closeSnackbar"]>(
    (snackId) => {
      if (snackId === undefined) setSnacks([])
      else setSnacks((snacks) => snacks.filter(({ id }) => id !== snackId))
    },
    []
  )

  const enqueueSnackbar = useCallback<SnackbarContext["enqueueSnackbar"]>(
    (snack) => {
      const id = `${Date.now()}${Math.random()}`

      setSnacks((currentSnacks) => [
        ...currentSnacks,
        {
          id,
          autoHideDuration,
          ...snack,
        },
      ])
      return id
    },
    [autoHideDuration]
  )

  const snackbars = useMemo(() => {
    return (
      <div
        sx={{
          position: "fixed",
          display: "flex",
          gap: 2,

          ...(position.vertical === "top"
            ? {
                top: SNACKBAR_MARGIN,
                flexDirection: "column",
              }
            : {
                bottom: SNACKBAR_MARGIN,
                flexDirection: "column-reverse",
              }),

          ...(position.horizontal === "right" && {
            right: SNACKBAR_MARGIN,
            alignItems: "flex-end",
          }),
          ...(position.horizontal === "left" && {
            left: SNACKBAR_MARGIN,
            alignItems: "flex-start",
          }),
          ...(position.horizontal === "center" && {
            left: "50%",
            transform: "translateX(-50%)",
            alignItems: "center",
          }),
        }}
      >
        {snacks.map((snack) => (
          <SnackbarItem key={snack.id} {...snack} />
        ))}
      </div>
    )
  }, [position.horizontal, position.vertical, snacks])

  return (
    <SnackbarContext.Provider
      value={{
        enqueueSnackbar,
        closeSnackbar,
        position,
      }}
    >
      {children}
      {snackbars}
    </SnackbarContext.Provider>
  )
}

export default SnackbarProvider
