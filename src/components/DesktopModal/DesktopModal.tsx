/** @jsxImportSource theme-ui */
import { HTMLAttributes, ReactNode, useMemo } from "react"
import Modal from "react-modal"
import Button from "../Button/Button"
import { useThemeUI, get } from "theme-ui"
import Paper from "../Paper/Paper"

export interface DesktopModalProps {
  title: string
  children: ReactNode
  isVisible?: boolean
  onClose: () => void
  onSubmit: () => void
  widthModal?: string
  className?: HTMLAttributes<HTMLDivElement>["className"]
}

const DesktopModal = ({
  title,
  children,
  className,
  onClose,
  onSubmit,
  widthModal = "500px",
  isVisible = false,
}: DesktopModalProps) => {
  const { theme } = useThemeUI()

  const borderBottomColor = useMemo(() => {
    return get(theme, "colors.text.90")
  }, [theme])

  return (
    <Modal
      {...className}
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
          padding: 0,
          borderRadius: 0,
          backgroundColor: "transparent",
        },
      }}
      isOpen={isVisible}
    >
      <Paper padding={0} sx={{ zIndex: 10, width: widthModal, gap: 5 }}>
        <div sx={{ display: "grid", gap: 6, p: 8, pb: 12, minWidth: 500 }}>
          <div
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 5,
              pb: 6,
              borderBottom: `1px solid ${borderBottomColor}`,
            }}
          >
            <header sx={{ variant: "text.heading1" }}>{title}</header>
            <div sx={{ display: "flex" }}>
              <Button
                onClick={onClose}
                variant="plain"
                color="secondary"
                sx={{ fontWeight: "500", mr: 4 }}
              >
                Cancel
              </Button>
              <Button onClick={onSubmit} iconName="IconCheck">
                Done
              </Button>
            </div>
          </div>
          {children}
        </div>
      </Paper>
    </Modal>
  )
}

export default DesktopModal
