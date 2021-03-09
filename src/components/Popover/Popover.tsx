/** @jsxRuntime classic /
/** @jsx jsx */
import { jsx } from "theme-ui"
import React, { useRef } from "react"
import Tippy, { TippyProps } from "@tippyjs/react"
import "tippy.js/dist/tippy.css"
import ReactDOM from "react-dom"

export interface PopoverProps {
  /** Popover content */
  content: React.ReactNode
  /** Reference element */
  children: TippyProps["children"]
  /** Used to control where the popover will be positioned in relation to the reference element */
  placement?: TippyProps["placement"]
  /** List of events that can trigger the popover showing. Only used if the element is not controlled (if `isVisible` is not used) */
  trigger?: Array<"mouseenter" | "focus" | "focusin" | "click" | "manual">

  /** Popover color theme */
  theme?: "light" | "dark"
  /** Popover border radius */
  borderRadius?: number

  /** Use to control the visibility of the popover from the parent component. Most of the time this is not needed when choosing the right triggers for your situation */
  isVisible?: boolean
  /** If `true` removes padding from the content container */
  noPadding?: boolean
  /** If `true` the popover will remain visible while the mouse is hovering over the content */
  isInteractive?: boolean
  /** If `true` the popover has an arrow pointing to the reference element */
  hasArrow?: boolean
  /** If `true` shows a background overlay to fade the rest of the application when the popover is open */
  hasBackgroundOverlay?: boolean
  /** `true` if popover should hide on click. Only used if the element is not controlled (if `isVisible` is not used) */
  hideOnClick?: boolean

  /** Callback called when there's a click outside the popover */
  onClickOutside?: TippyProps["onClickOutside"]
  /** Callback called when popover is hidden */
  onHide?: TippyProps["onHide"]
  /** Callback called when popover is shown */
  onShow?: TippyProps["onShow"]
  /** Callback called when popover is created, can be used to access the underlying tippy.js instance */
  onCreate?: TippyProps["onCreate"]

  /** z-index of the popover element */
  zIndexPopper?: number
  /** z-index of the background overlay element */
  zIndexOverlay?: number
}

const Popover = ({
  content,
  children,
  placement = "auto",
  trigger = ["mouseenter", "focus"],

  theme = "light",
  borderRadius = 4,

  isVisible, // defaults to undefined, otherwise component is controlled
  noPadding = false,
  isInteractive = false,
  hasArrow = false,
  hasBackgroundOverlay = false,
  hideOnClick = false,

  onClickOutside,
  onHide,
  onShow,
  onCreate,

  zIndexPopper = 9000,
  zIndexOverlay = 8000,
}: PopoverProps) => {
  const overlayRef = useRef(document.createElement("div"))
  const isControlled = isVisible !== undefined

  return (
    <React.Fragment>
      <Tippy
        content={content}
        theme={theme}
        visible={isVisible}
        interactive={isInteractive}
        arrow={hasArrow}
        hideOnClick={isControlled ? undefined : hideOnClick}
        trigger={isControlled ? undefined : trigger.join(" ")}
        placement={placement}
        interactiveBorder={16}
        zIndex={zIndexPopper}
        onClickOutside={(instance, event) => onClickOutside?.(instance, event)}
        onCreate={onCreate}
        onShow={(instance) => {
          onShow?.(instance)
          overlayRef.current.style.opacity = "0"
          document.body.append(overlayRef.current)
          overlayRef.current.style.transition = "opacity 200ms"
          setTimeout(() => {
            overlayRef.current.style.opacity = "1"
          })
        }}
        onHide={(instance) => {
          overlayRef.current.remove()
          onHide?.(instance)
        }}
        popperOptions={{
          modifiers: [
            {
              name: "arrow",
              options: {
                padding: ({
                  popper,
                  placement,
                }: {
                  popper: { width: number; height: number }
                  placement: string
                }) => {
                  const arrowSize = 16
                  const defaultPadding = (borderRadius + 1) * 2
                  if (
                    placement.startsWith("left") ||
                    placement.startsWith("right")
                  ) {
                    return Math.min(
                      (popper.height - arrowSize) / 2,
                      defaultPadding
                    )
                  }
                  if (
                    placement.startsWith("top") ||
                    placement.startsWith("bottom")
                  ) {
                    return Math.min(
                      (popper.width - arrowSize) / 2,
                      defaultPadding
                    )
                  }
                  return defaultPadding
                },
              },
            },
          ],
        }}
        sx={{
          "&&": {
            borderRadius,
            boxShadow: "0px 1px 12px rgba(0, 0, 0, 0.16)",
            ".tippy-content": noPadding
              ? { padding: 0 }
              : {
                  py: 1,
                  px: 2,
                },

            "&[data-theme~='light']": {
              backgroundColor: "#fff",
              color: "text.0",
              "&[data-placement^='top'] > .tippy-arrow::before": {
                borderTopColor: "#fff",
              },
              "&[data-placement^='bottom'] > .tippy-arrow::before": {
                borderBottomColor: "#fff",
              },
              "&[data-placement^='left'] > .tippy-arrow::before": {
                borderLeftColor: "#fff",
              },
              "&[data-placement^='right'] > .tippy-arrow::before": {
                borderRightColor: "#fff",
              },
            },

            "&[data-theme~='dark']": {
              backgroundColor: "text.0",
              color: "#fff",
              "&[data-placement^='top'] > .tippy-arrow::before": {
                borderTopColor: "text.0",
              },
              "&[data-placement^='bottom'] > .tippy-arrow::before": {
                borderBottomColor: "text.0",
              },
              "&[data-placement^='left'] > .tippy-arrow::before": {
                borderLeftColor: "text.0",
              },
              "&[data-placement^='right'] > .tippy-arrow::before": {
                borderRightColor: "text.0",
              },
            },
          },
        }}
      >
        {children}
      </Tippy>
      {hasBackgroundOverlay &&
        ReactDOM.createPortal(
          <div
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              pointerEvents: "none",
              zIndex: zIndexOverlay,
            }}
          />,
          overlayRef.current
        )}
    </React.Fragment>
  )
}

export default Popover
