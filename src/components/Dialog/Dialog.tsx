/** @jsxImportSource theme-ui */
import {
  DialogProps as ReachDialogProps,
  DialogContent,
  DialogOverlay,
} from "@reach/dialog"
import "@reach/dialog/styles.css"

export type DialogProps = ReachDialogProps

const Dialog = ({ children, ...props }: DialogProps) => {
  return (
    <DialogOverlay
      {...props}
      sx={{
        backgroundColor: "rgba(29, 29, 29, 0.6)",
      }}
    >
      <DialogContent
        aria-label="Modal"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "&&": {
            p: 0,
            my: "10vh",
            minHeight: "80vh",
            backgroundColor: "transparent",
            width: "fit-content",
          },
        }}
        onClick={props.onDismiss}
      >
        <div onClick={(event) => event.stopPropagation()}>{children}</div>
      </DialogContent>
    </DialogOverlay>
  )
}

export default Dialog
