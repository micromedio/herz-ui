/** @jsxRuntime classic /
/** @jsx jsx */
import { jsx } from "theme-ui"
import { ReactNode, useState } from "react"
import Popover, { PopoverProps } from "../Popover/Popover"
import Button from "../Button/Button"
import { Instance } from "tippy.js"

export interface FloatingCardProps {
  title: string
  children: PopoverProps["children"]
  body: ReactNode

  placement?: PopoverProps["placement"]
  isVisible?: boolean
  onClose?: () => void
}

const FloatingCard = ({
  title,
  children,
  body,
  placement = "bottom-start",

  isVisible,
  onClose,
}: FloatingCardProps) => {
  const [tippy, setTippy] = useState<Instance>()
  const isControlled = isVisible !== undefined

  return (
    <Popover
      onCreate={(instance) => setTippy(instance)}
      hasArrow
      hasBackgroundOverlay
      noPadding
      isInteractive
      isVisible={isVisible}
      trigger={["click"]}
      hideOnClick
      placement={placement}
      content={
        <div
          sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 6 }}
        >
          <div
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
            }}
          >
            <div
              sx={{
                pl: 8,
                flexGrow: 1,
                textAlign: "center",
                variant: "text.heading2",
              }}
            >
              {title}
            </div>
            <Button
              iconName="IconX"
              color="text"
              onClick={() => {
                if (!isControlled) tippy?.hide()
                onClose?.()
              }}
            />
          </div>
          <div>{body}</div>
        </div>
      }
      onHide={onClose}
      onClickOutside={onClose}
    >
      {children}
    </Popover>
  )
}

export default FloatingCard
