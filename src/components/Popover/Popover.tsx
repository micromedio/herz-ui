/** @jsxImportSource theme-ui */
import { ThemeUICSSObject } from "theme-ui"
import React, { useCallback, useRef, useState } from "react"
import { TippyProps } from "@tippyjs/react"
import { roundArrow } from "tippy.js"
import ReactDOM from "react-dom"
import { ssrSafeCreateDiv } from "../../helpers/ssr"
import LazyTippy from "./LazyTippy"

export interface PopoverProps {
  /** Content is always rendered, even when the Popover is not mounted or hidden */
  alwaysRenderContent?: boolean
  /** Popover content */
  content: React.ReactNode
  /** Reference element */
  children: TippyProps["children"]
  /** Used to control where the popover will be positioned in relation to the reference element */
  placement?: TippyProps["placement"]
  /** List of events that can trigger the popover showing. Only used if the element is not controlled (if `isVisible` is not used) */
  trigger?: Array<"mouseenter" | "focus" | "focusin" | "click" | "manual">
  /** Element in wich the Popover should be appended to */
  appendTo?: TippyProps["appendTo"]

  /** Popover color theme */
  theme?: "light" | "dark"
  /** Popover border radius */
  borderRadius?: number
  /** Popover content style */
  contentStyle?: ThemeUICSSObject
  /** Popover box style */
  boxStyle?: ThemeUICSSObject

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
  alwaysRenderContent = false,
  content,
  children,
  placement = "auto",
  trigger = ["mouseenter", "focus"],
  appendTo,

  theme = "light",
  borderRadius = 4,
  contentStyle,
  boxStyle,

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
  const [visible, setVisible] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(ssrSafeCreateDiv())

  const isControlled = isVisible !== undefined

  const arrowStyles: ThemeUICSSObject = {
    ".tippy-svg-arrow": {
      width: 16,
      height: 16,
      textAlign: "initial",
      "& > svg": {
        position: "absolute",
      },
    },

    "&[data-placement^='top'] > .tippy-svg-arrow": {
      bottom: 0,
      "& > svg": {
        top: "16px",
        transform: "rotate(180deg) scale(1.2, 1.5)",
      },
    },
    "&[data-placement^='bottom'] > .tippy-svg-arrow": {
      top: 0,
      "& > svg": {
        bottom: "16px",
        transform: "scale(1.2, 1.5)",
      },
    },
    "&[data-placement^='left'] > .tippy-svg-arrow": {
      right: 0,
      "& > svg": {
        left: "11px",
        top: "calc(50% - 3px)",
        transform: "rotate(90deg) scale(1.1, 1.6)",
      },
    },
    "&[data-placement^='right'] > .tippy-svg-arrow": {
      left: 0,
      "& > svg": {
        right: "11px",
        top: "calc(50% - 3px)",
        transform: "rotate(-90deg) scale(1.1, 1.6)",
      },
    },
  }

  const themeStyles: ThemeUICSSObject = {
    "&[data-theme~='light']": {
      backgroundColor: "#fff",
      color: "text",
      "& > .tippy-svg-arrow": {
        fill: "#fff",
      },
    },

    "&[data-theme~='dark']": {
      backgroundColor: "text",
      color: "#fff",
      "& > .tippy-svg-arrow": {
        fill: "text",
      },
    },
  }

  const calculateArrowPadding = useCallback(
    ({
      popper,
      placement,
    }: {
      popper: { width: number; height: number }
      placement: string
    }) => {
      const arrowSize = 16
      const defaultPadding = (borderRadius + 2) * 2
      if (placement.startsWith("left") || placement.startsWith("right")) {
        return Math.min((popper.height - arrowSize) / 2, defaultPadding)
      }
      if (placement.startsWith("top") || placement.startsWith("bottom")) {
        return Math.min((popper.width - arrowSize) / 2, defaultPadding)
      }
      return defaultPadding
    },
    [borderRadius]
  )

  return (
    <React.Fragment>
      <LazyTippy
        alwaysRenderContent={alwaysRenderContent}
        content={content}
        theme={theme}
        visible={isVisible}
        interactive={isInteractive}
        arrow={hasArrow && roundArrow}
        hideOnClick={isControlled ? undefined : hideOnClick}
        trigger={isControlled ? undefined : trigger.join(" ")}
        placement={placement}
        interactiveBorder={16}
        zIndex={zIndexPopper}
        onClickOutside={(instance, event) => onClickOutside?.(instance, event)}
        onCreate={onCreate}
        onShow={(instance) => {
          setVisible(true)
          if (overlayRef.current) {
            document.body.append(overlayRef.current)
          }
          onShow?.(instance)
        }}
        onHide={(instance) => {
          setVisible(false)

          setTimeout(() => {
            if (overlayRef.current) overlayRef.current.remove()
          })
          onHide?.(instance)
        }}
        {...(appendTo ? { appendTo } : {})}
        popperOptions={{
          modifiers: [
            {
              name: "arrow",
              options: {
                padding: calculateArrowPadding,
              },
            },
          ],
        }}
        sx={{
          "&&": {
            maxWidth: "none !important",
            position: "relative",
            outline: 0,
            transitionProperty: "transform,visibility,opacity",
            borderRadius,
            boxShadow: "dark",
            ".tippy-content": {
              position: "relative",
              ...(noPadding
                ? { padding: 0 }
                : {
                    py: 1,
                    px: 2,
                  }),
              ...contentStyle,
            },
            "&[data-animation=fade][data-state=hidden]": {
              opacity: 0,
            },
            ...arrowStyles,
            ...themeStyles,
            ...boxStyle,
          },
        }}
      >
        {children}
      </LazyTippy>
      {hasBackgroundOverlay && overlayRef.current
        ? ReactDOM.createPortal(
            <div
              sx={{
                "@keyframes fadeIn": {
                  "0%": {
                    opacity: 0,
                  },
                  "100%": {
                    opacity: 1,
                  },
                },
                "@keyframes fadeOut": {
                  "0%": {
                    opacity: 1,
                  },
                  "100%": {
                    opacity: 0,
                  },
                },
                animation: visible
                  ? `0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards fadeIn`
                  : `0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards fadeOut`,
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
          )
        : undefined}
    </React.Fragment>
  )
}

export default Popover
