/** @jsxRuntime classic /
/** @jsx jsx */
import React from "react"
import { jsx } from "theme-ui"

export interface BreadcrumbsProps {
  children?: React.ReactNode
}

const BreadcrumbsSeparator = () => {
  return (
    <li
      sx={{
        display: "flex",
        userSelect: "none",
        mx: 3,
      }}
    >
      {">"} {/* TODO: use "arrow" icon */}
    </li>
  )
}

const Breadcrumbs = ({ children }: BreadcrumbsProps) => {
  let allItems = React.Children.toArray(children).filter((child) =>
    React.isValidElement(child)
  )

  allItems = allItems.map((child, index) => (
    <li
      key={`child-${index}`}
      sx={
        index === allItems.length - 1
          ? { color: "text.0", variant: "text.heading3" }
          : {}
      }
    >
      {child}
    </li>
  ))

  const insertSeparator = (items: Array<React.ReactNode>) => {
    let result: Array<React.ReactNode> = []

    items.forEach((current, index) => {
      if (index < items.length - 1) {
        result = result.concat(
          current,
          <BreadcrumbsSeparator aria-hidden key={`separator-${index}`} />
        )
      } else {
        result.push(current)
      }
    })

    return result
  }

  return (
    <nav
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        p: 0,
        m: 0,
        color: "text.40",
        variant: "text.body1",
      }}
    >
      <ol
        sx={{
          display: "flex",
          listStyle: "none",
          a: {
            color: "inherit",
            textDecoration: "none",
          },
        }}
      >
        {insertSeparator(allItems)}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
