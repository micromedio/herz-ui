/** @jsxRuntime classic /
/** @jsx jsx */
import { jsx } from "theme-ui"
import { ReactNode, useState } from "react"
import Popover, { PopoverProps } from "../Popover/Popover"
import Button from "../Button/Button"
import { Instance } from "tippy.js"

export interface FloatingCardProps {
  /** Card title */
  title: string
  /** Reference element, where the FloatingCard will point to and spawn from */
  children: PopoverProps["children"]
  /** Card body content */
  body: ReactNode
  /** Title text alignment */
  titleAlign?: "start" | "center"

  /** Placement of the card relative to the reference element */
  placement?: PopoverProps["placement"]
  /** Controls if the card is visible or not. Use it if you need the visibility to be controlled by the parent */
  isVisible?: boolean
  /** Callback called when the Popover spawning the card is closed */
  onClose?: () => void
}

const FloatingCard = ({
  title,
  titleAlign = "start",
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
                pl: titleAlign === "start" ? 0 : 8,
                flexGrow: 1,
                textAlign: titleAlign,
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
