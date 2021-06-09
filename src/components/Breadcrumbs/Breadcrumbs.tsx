/** @jsxImportSource theme-ui */
import React from "react"
import Icon from "../Icon/Icon"

export interface BreadcrumbsProps {
  children?: React.ReactNode
}

const BreadcrumbsSeparator = () => {
  return (
    <li sx={{ display: "flex" }}>
      <Icon name="IconChevronRight" sx={{ color: "text.40", mx: 1 }} />
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
          alignItems: "center",
          margin: 0,
          padding: 0,
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
