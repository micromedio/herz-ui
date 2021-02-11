/** @jsxRuntime classic /*
/** @jsx jsx */
import React, { Fragment, useState } from "react"
import { jsx, Text } from "theme-ui"
import { usePopper } from "react-popper"

export interface ITooltipProps {
  title: string
  children: React.ReactChild
}

export default function Tooltip({ children, title }: ITooltipProps) {
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  )
  const [
    referenceElement,
    setReferenceElement,
  ] = useState<HTMLSpanElement | null>(null)
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null)
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: "arrow", options: { element: arrowElement } }],
  })

  return (
    <Fragment>
      <span ref={setReferenceElement}>{children}</span>
      <div
        sx={{
          paddingY: 1,
          paddingX: 2,
          borderRadius: "6px",
          backgroundColor: "text",
          boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.2)",
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
