/** @jsxImportSource theme-ui */
import React, {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { useThemeUI } from "theme-ui"
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
      <div sx={{ display: "flex", flexDirection: "row", flexWrap: "nowrap" }}>
        {tabButton.map((item) => item)}
      </div>
      <div>{tabPanel.map((item) => item)}</div>
    </>
  )
}

export interface TabButtonProps {
  title: string
}

const OUTSIDE_BOTTOM_TO_TOP_CURVE_WIDTH = 18.53
const ORANGE_RECT_LINES_WIDTH_DIFF = 8.12
const LEFT_RIGHT_ORANGE_RECT_TO_BORDER_DISTANCE = 6.5
const TEXT_PADDING = 6

const SVG_HEIGHT = 36

const TabButton = ({ title }: TabButtonProps) => {
  const { index, toggleOpen, openIndex } = useTabContext()
  const isFirstTab = useMemo(() => index === 0, [index])
  const isOpen = useMemo(() => openIndex === index, [index, openIndex])
  const { theme } = useThemeUI()
  const textRef = useRef<HTMLSpanElement>(null)

  const [width, setWidth] = useState(0)

  useLayoutEffect(() => {
    if (textRef.current) {
      setWidth(textRef.current.clientWidth)
    }
  }, [])

  const containerWidth = useMemo(() => {
    if (isFirstTab)
      return (
        width +
        TEXT_PADDING * 2 +
        OUTSIDE_BOTTOM_TO_TOP_CURVE_WIDTH +
        LEFT_RIGHT_ORANGE_RECT_TO_BORDER_DISTANCE
      )
    return width + OUTSIDE_BOTTOM_TO_TOP_CURVE_WIDTH * 2 + TEXT_PADDING * 2
  }, [isFirstTab, width])

  const borderPath = useMemo(() => {
    if (isFirstTab) {
      return `m 0.5 36 l 0 -27 c 0 -4 2 -8 6.53 -8 l ${
        containerWidth -
        OUTSIDE_BOTTOM_TO_TOP_CURVE_WIDTH -
        LEFT_RIGHT_ORANGE_RECT_TO_BORDER_DISTANCE
      } 0 c 4.47 0 6.47 4 6.47 8 l 0 17 c 0 5 5 10 12 10`
    }
    return `m 0 36 c 8 -1 12 -6 12 -12 l 0 -15 c 0 -4 2 -8 6.53 -8 l ${
      containerWidth - OUTSIDE_BOTTOM_TO_TOP_CURVE_WIDTH * 2
    } 0 c 4.47 0 6.47 4 6.47 8 l 0 17 c 0 5 5 10 12 10`
  }, [containerWidth, isFirstTab])

  const orangeRectPath = useMemo(() => {
    if (isFirstTab) {
      return `m 2.97 3.3 l ${
        containerWidth -
        OUTSIDE_BOTTOM_TO_TOP_CURVE_WIDTH -
        LEFT_RIGHT_ORANGE_RECT_TO_BORDER_DISTANCE +
        ORANGE_RECT_LINES_WIDTH_DIFF
      } 0 c 0 -1 -2.59 -2 -4.06 -2 l -${
        containerWidth -
        OUTSIDE_BOTTOM_TO_TOP_CURVE_WIDTH -
        LEFT_RIGHT_ORANGE_RECT_TO_BORDER_DISTANCE
      } 0 c -1.53 0 -3.53 1 -4.06 2 z`
    }
    return `m 14.47 3.3 l ${
      containerWidth -
      OUTSIDE_BOTTOM_TO_TOP_CURVE_WIDTH * 2 +
      ORANGE_RECT_LINES_WIDTH_DIFF
    } 0 c 0 -1 -2.59 -2 -4.06 -2 l -${
      containerWidth - OUTSIDE_BOTTOM_TO_TOP_CURVE_WIDTH * 2
    } 0 c -1.53 0 -3.53 1 -4.06 2 z`
  }, [containerWidth, isFirstTab])

  const tabToggler = useCallback(() => {
    if (openIndex !== index) toggleOpen(index)
  }, [index, openIndex, toggleOpen])

  return (
    <div
      onClick={tabToggler}
      sx={{
        cursor: "pointer",
        display: "grid",
        height: SVG_HEIGHT,
        mb: "-1px",
      }}
    >
      <svg
        aria-disabled="false"
        aria-expanded={isOpen}
        height={SVG_HEIGHT}
        role="button"
        sx={{
          cursor: "pointer",
          mb: "-0.8px",
          gridColumn: 1,
          gridRow: 1,
          zIndex: 1,
        }}
        width={containerWidth}
      >
        <path
          d={borderPath}
          fill={isOpen ? "#ffffff" : "transparent"}
          stroke={isOpen ? theme.colors?.text?.[90] : "transparent"}
          strokeWidth={1}
          sx={{
            transition: "all 0.15s cubic-bezier(0.16, 1, 0.3, 1)",
            transitionProperty: "fill, stroke",
          }}
        />
        <path
          d={orangeRectPath}
          fill={isOpen ? theme.colors?.primary?.[0] : "transparent"}
          sx={{
            transition: "all 0.15s cubic-bezier(0.16, 1, 0.3, 1)",
            transitionProperty: "fill, stroke",
          }}
        />
      </svg>
      <span
        ref={textRef}
        sx={{
          alignSelf: "center",
          fill: isOpen ? "text" : "text.40",
          gridColumn: 1,
          gridRow: 1,
          justifySelf: "center",
          mr:
            index === 0
              ? OUTSIDE_BOTTOM_TO_TOP_CURVE_WIDTH -
                LEFT_RIGHT_ORANGE_RECT_TO_BORDER_DISTANCE
              : undefined,
          variant: "text.heading4",
          zIndex: 2,
        }}
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
