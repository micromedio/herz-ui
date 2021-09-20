/** @jsxImportSource theme-ui */
import { HTMLAttributes, ReactNode } from "react"
import Modal from "react-modal"
import Paper from "../Paper/Paper"

export interface DesktopModalProps {
  children: ReactNode
  isVisible?: boolean
  className?: HTMLAttributes<HTMLDivElement>["className"]
}

const DesktopModal = ({
  children,
  className,
  isVisible = false,
}: DesktopModalProps) => {
  return (
    <Modal
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: "rgba(29, 29, 29, 0.6)",
        },
        content: {
          border: "none",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          borderRadius: 0,
          padding: "32px",
          backgroundColor: "transparent",
          height: "100vh",
          width: "100vw",
        },
      }}
      isOpen={isVisible}
    >
      <div
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          className={className}
          sx={{
            zIndex: 10,
            gap: 5,
            margin: "auto",
            padding: "32px",
            height: "fit-content",
          }}
        >
          {children}
        </Paper>
      </div>
    </Modal>
  )
}

export default DesktopModal
