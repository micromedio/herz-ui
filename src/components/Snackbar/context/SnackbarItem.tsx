/** @jsxImportSource theme-ui */

import { useCallback, useEffect, useRef } from "react"
import { useSnackbar } from "../hooks/useSnackbar"
import Snackbar, { SnackbarProps } from "../Snackbar"

export interface SnackbarItemProps extends SnackbarProps {
  id: string
  autoHideDuration: number
  showClose?: boolean
  isPersistent?: boolean
}

const SnackbarItem = ({
  id,
  autoHideDuration,
  showClose = false,
  isPersistent = false,
  title,
  type,
  body,
  onClose,
}: SnackbarItemProps) => {
  const { closeSnackbar, position } = useSnackbar()
  const timerAutoHide = useRef<ReturnType<typeof setTimeout>>()

  const handleClose = useCallback(() => {
    onClose?.()
    closeSnackbar(id)
  }, [closeSnackbar, id, onClose])

  const setAutoHideTimer = useCallback(
    (duration?: number) => {
      clearTimeout(timerAutoHide?.current as unknown as number)
      const timeout = setTimeout(() => {
        handleClose()
      }, duration)
      timerAutoHide.current = timeout
    },
    [handleClose]
  )

  const handlePause = useCallback(() => {
    if (!isPersistent) clearTimeout(timerAutoHide?.current as unknown as number)
  }, [isPersistent])

  const handleResume = useCallback(() => {
    if (!isPersistent) setAutoHideTimer(autoHideDuration)
  }, [autoHideDuration, isPersistent, setAutoHideTimer])

  useEffect(() => {
    if (!isPersistent) setAutoHideTimer(autoHideDuration)

    return () => {
      clearTimeout(timerAutoHide?.current as unknown as number)
    }
  }, [autoHideDuration, isPersistent, setAutoHideTimer])

  return (
    <div onMouseEnter={handlePause} onMouseLeave={handleResume}>
      <Snackbar
        title={title}
        type={type}
        body={body}
        onClose={showClose ? handleClose : undefined}
        position={position}
      />
    </div>
  )
}

export default SnackbarItem
