/** @jsxImportSource theme-ui */
import Popover, { PopoverProps } from "../Popover/Popover"

export interface TooltipProps {
  title: string
  children: PopoverProps["children"]
  placement?: PopoverProps["placement"]
  trigger?: PopoverProps["trigger"]
  isVisible?: PopoverProps["isVisible"]
  isInteractive?: PopoverProps["isInteractive"]
  custom?: React.ReactNode
}

export default function Tooltip({
  children,
  title,
  placement,
  trigger,
  isVisible,
  isInteractive,
  custom,
}: TooltipProps) {
  return (
    <Popover
      placement={placement}
      hasArrow={false}
      trigger={trigger}
      isVisible={isVisible}
      isInteractive={isInteractive}
      content={
        <div
          sx={{
            variant: "text.body2",
            fontWeight: 600,
            fontSize: 12,
            "h2,h3,h4,h5,h6": { color: "#fff", fontSize: "1rem" },
            p: { color: "#BBBBBB" },
            strong: { color: "#fff" },
          }}
        >
          {title} {custom && custom}
        </div>
      }
      borderRadius={2}
      theme="dark"
    >
      {children}
    </Popover>
  )
}
