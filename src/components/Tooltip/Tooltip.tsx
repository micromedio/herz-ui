/** @jsxRuntime classic /*
/** @jsx jsx */
import { jsx } from "theme-ui"
import Popover, { PopoverProps } from "../Popover/Popover"

export interface TooltipProps {
  title: string
  children: PopoverProps["children"]
  placement?: PopoverProps["placement"]
  trigger?: PopoverProps["trigger"]
  isVisible?: PopoverProps["isVisible"]
}

export default function Tooltip({
  children,
  title,
  placement,
  trigger,
  isVisible,
}: TooltipProps) {
  return (
    <Popover
      placement={placement}
      hasArrow={false}
      trigger={trigger}
      isVisible={isVisible}
      content={
        <div sx={{ variant: "text.body2", fontWeight: 600 }}>{title}</div>
      }
      borderRadius={2}
      theme="dark"
    >
      {children}
    </Popover>
  )
}
