/** @jsxImportSource theme-ui */
import { get } from "@theme-ui/css"
import React, { useCallback, useState } from "react"
import { useTabContext } from "./context"
import { TabContext } from "./context"

export interface TabProps {
  initialOpenIndex?: number
  children: React.ReactNode
  activeBackgroundColor?:
    | "primary"
    | "secondary"
    | "text"
    | "success"
    | "warning"
}

const Tab = ({
  children,
  initialOpenIndex,
  activeBackgroundColor = "secondary",
}: TabProps) => {
  const [openIndex, setOpenIndex] = useState<number | undefined>(
    initialOpenIndex
  )

  const toggleOpen = useCallback(
    (index: number) => {
      if (openIndex === index) setOpenIndex(undefined)
      else setOpenIndex(index)
    },
    [openIndex]
  )

  const allItems = React.Children.toArray(children)
    .filter((child) => {
      return React.isValidElement(child)
    })
    .map((child, index) => (
      <TabContext.Provider
        value={{ index, toggleOpen, openIndex, activeBackgroundColor }}
        key={index}
      >
        {child}
      </TabContext.Provider>
    ))

  const tabLink = allItems.filter((item) =>
    item.props.children.props.hasOwnProperty("title")
  )
  const tabPanel = allItems.filter((item) =>
    item.props.children.props.hasOwnProperty("index")
  )
  return (
    <>
      <div sx={{ display: "flex", flexDirection: "row" }}>
        {tabLink.map((item) => item)}
      </div>
      <div>{tabPanel.map((item) => item)}</div>
    </>
  )
}

export interface TabLinkProps {
  title: string
  // children: React.ReactNode
  // className?: HTMLAttributes<HTMLDivElement>["className"]
}

const TabLink = ({ title }: TabLinkProps) => {
  const { index, toggleOpen, openIndex, activeBackgroundColor } =
    useTabContext()
  const isOpen = openIndex === index
  return (
    <div
      role="button"
      aria-disabled="false"
      aria-expanded={isOpen}
      sx={{
        px: 6,
        py: 2,
        variant: "text.body1",
        color: "text.40",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        borderRadius: 2,
        height: "36px",
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        border: isOpen ? "1px solid #E8E8E9" : "none",
        borderBottom: "none",
        borderTop: "none",
        boxSizing: "border-box",
        backgroundColor: (t) =>
          isOpen ? get(t, `colors.${activeBackgroundColor}.97`) : "transparent",
        transition: "background-color 150ms linear",
      }}
      onClick={() => toggleOpen(index)}
    >
      <span
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "2px",
          width: "100%",
          backgroundColor: isOpen ? "primary" : "transparent",
        }}
      />
      <span sx={{ variant: "text.heading4" }}>{title}</span>
    </div>
  )
}

export interface TabPanelProps {
  children: React.ReactNode
  index: number
}

const TabPanel = ({ children, index }: TabPanelProps) => {
  const { openIndex } = useTabContext()
  const isOpen = openIndex === index
  return (
    <>
      {isOpen && (
        <div
          id={index.toString()}
          sx={{
            display: "block",
            position: "relative",
            py: 5,
            px: 6,
            borderRadius: "12px",
            borderTopLeftRadius: openIndex == 0 && isOpen ? "0" : "12px",
            border: "1px solid #E8E8E9",
            backgroundColor: "#F3F3F3",
          }}
        >
          {children}
        </div>
      )}
    </>
  )
}

Tab.Link = TabLink
Tab.Panel = TabPanel
export default Tab
