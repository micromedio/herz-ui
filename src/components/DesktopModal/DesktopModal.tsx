/** @jsxImportSource theme-ui */
import Paper from "../Paper/Paper"
import Dialog, { DialogProps } from "../Dialog/Dialog"
import { ReactNode } from "react"
import { Divider } from ".."

export interface DesktopModalProps extends DialogProps {
  title?: string
  className?: string
}

const DesktopModal = ({
  children,
  className,
  ...dialogProps
}: DesktopModalProps) => {
  return (
    <Dialog {...dialogProps}>
      <Paper
        className={className}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
          p: 8,
          mb: 4,
        }}
      >
        {children}
      </Paper>
    </Dialog>
  )
}

DesktopModal.Header = function Header({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <>
      <header
        sx={{ display: "flex", justifyContent: "space-between", gap: 8 }}
        className={className}
      >
        {children}
      </header>
      <Divider />
    </>
  )
}

DesktopModal.Body = function Body({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <>
      <section
        sx={{ variant: "text.body1", color: "text.40" }}
        className={className}
      >
        {children}
      </section>
    </>
  )
}

DesktopModal.Title = function Title({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <h1 sx={{ variant: "text.heading1", m: 0 }} className={className}>
      {children}
    </h1>
  )
}

DesktopModal.Actions = function Actions({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div
      sx={{
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
        gap: 2,
      }}
      className={className}
    >
      {children}
    </div>
  )
}

export default DesktopModal
