/** @jsxImportSource theme-ui */
import React, { useCallback, useState } from "react"
import { useTabContext } from "./context"
import { TabContext } from "./context"

export interface TabsProps {
  initialOpenIndex?: number
  children: React.ReactNode
}

const Tabs = ({ children, initialOpenIndex }: TabsProps) => {
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
      <TabContext.Provider value={{ index, toggleOpen, openIndex }} key={index}>
        {child}
      </TabContext.Provider>
    ))

  const tabButton = allItems.filter((item) =>
    item.props.children.props.hasOwnProperty("title")
  )
  const tabPanel = allItems.filter((item) =>
    item.props.children.props.hasOwnProperty("index")
  )
  return (
    <>
      <div sx={{ display: "flex", flexDirection: "row" }}>
        {tabButton.map((item) => item)}
      </div>
      <div>{tabPanel.map((item) => item)}</div>
    </>
  )
}

export interface TabButtonProps {
  title: string
}

const TabButton = ({ title }: TabButtonProps) => {
  const { index, toggleOpen, openIndex } = useTabContext()
  const isOpen = openIndex === index
  return (
    <div
      role="button"
      aria-disabled="false"
      aria-expanded={isOpen}
      sx={{
        px: 6,
        py: 2,
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        borderRadius: 2,
        height: "36px",
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        border: "1px solid",
        borderColor: isOpen ? "text.90" : "transparent",
        borderBottom: "none",
        boxSizing: "border-box",
        backgroundColor: isOpen ? "white" : "transparent",
        transition: "background-color 150ms linear",
        boxShadow: isOpen ? "0px 1px 12px rgba(0, 0, 0, 0.04)" : "none",
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
      <span
        sx={{ variant: "text.heading4", color: isOpen ? "text" : "text.40" }}
      >
        {title}
      </span>
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
            borderRadius: 3,
            borderTopLeftRadius: openIndex == 0 && isOpen ? 0 : 3,
            border: "1px solid",
            borderColor: "text.90",
            backgroundColor: "text.95",
            boxShadow: isOpen ? "0px 1px 12px rgba(0, 0, 0, 0.04)" : "none",
          }}
        >
          {children}
        </div>
      )}
    </>
  )
}

Tabs.Tab = TabButton
Tabs.Panel = TabPanel
export default Tabs
