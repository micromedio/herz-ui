/** @jsxImportSource theme-ui */
import { HTMLAttributes, ReactNode, useEffect } from "react"
import Modal from "react-modal"
import Paper from "../Paper/Paper"

export interface DesktopModalProps {
  children: ReactNode
  isVisible?: boolean
  widthModal?: string
  className?: HTMLAttributes<HTMLDivElement>["className"]
}

const DesktopModal = ({
  children,
  className,
  widthModal = "500px",
  isVisible = false,
}: DesktopModalProps) => {
  useEffect(() => {
    const body = document.querySelectorAll("body")
    if (isVisible) {
      body[0].style.overflowY = "hidden"
    } else {
      body[0].style.overflowY = "scroll"
    }
  }, [isVisible])

  return (
    <Modal
      {...className}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: "rgba(29, 29, 29, 0.6)",
          overflowY: "auto",
        },
        content: {
          marginTop: "20px",
          border: "none",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          borderRadius: 0,
          backgroundColor: "transparent",
        },
      }}
      isOpen={isVisible}
    >
      <Paper padding={0} sx={{ zIndex: 10, width: widthModal, gap: 5 }}>
        <div sx={{ display: "grid", gap: 6, p: 8, pb: 12, minWidth: 500 }}>
          {children}
        </div>
      </Paper>
    </Modal>
  )
}

export default DesktopModal
