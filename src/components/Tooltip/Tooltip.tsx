/** @jsxRuntime classic /*
/** @jsx jsx */
import React, { Fragment, useState } from "react"
import { jsx } from "theme-ui"
import { usePopper } from "react-popper"

export interface ITooltipProps {
  referenceElement: HTMLElement | null
  children: React.ReactChild
}

export default function Tooltip({ children, referenceElement }: ITooltipProps) {
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  )
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null)
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: "arrow", options: { element: arrowElement } }],
  })

  return (
    <Fragment>
      <div
        sx={{
          backgroundColor: "#333",
          color: "white",
          padding: "5px 10px",
          borderRadius: "4px",
          fontSize: "13px",
        }}
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
      >
        {children}
        <div ref={setArrowElement} style={styles.arrow} />
      </div>
    </Fragment>
  )
}
