/** @jsxRuntime classic /*
/** @jsx jsx */
import React, { Fragment, useState } from "react"
import { jsx, Text } from "theme-ui"
import { usePopper } from "react-popper"

type Placement =
  | "auto"
  | "auto-start"
  | "auto-end"
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "right"
  | "right-start"
  | "right-end"
  | "left"
  | "left-start"
  | "left-end"

export interface ITooltipProps {
  title: string
  children: React.ReactChild
  placement?: Placement
}

export default function Tooltip({
  children,
  title,
  placement = "bottom",
}: ITooltipProps) {
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  )
  const [
    referenceElement,
    setReferenceElement,
  ] = useState<HTMLSpanElement | null>(null)
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null)
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      { name: "arrow", options: { element: arrowElement } },
      { name: "offset", options: { offset: [0, 8] } },
    ],
    placement,
  })

  return (
    <Fragment>
      <span
        sx={{
          "&:hover": {
            "+div": {
              visibility: "visible",
              opacity: 1,
            },
          },
        }}
        ref={setReferenceElement}
        data-testid="tooltip"
      >
        {children}
      </span>
      <div
        sx={{
          visibility: "hidden",
          opacity: 0,
          paddingY: 1,
          paddingX: 2,
          borderRadius: "6px",
          backgroundColor: "text",
          boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.2)",
          transition: "all .2s linear",
          transitionDelay: ".2s",
        }}
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
      >
        <Text
          variant="body2"
          sx={{
            color: "#fff",
            fontWeight: 600,
          }}
        >
          {title}
        </Text>
        <div ref={setArrowElement} style={styles.arrow} />
      </div>
    </Fragment>
  )
}
