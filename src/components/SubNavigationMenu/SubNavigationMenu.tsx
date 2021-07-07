/** @jsxImportSource theme-ui */
import {
  cloneElement,
  MouseEventHandler,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from "react"
import { jsx as TUIjsx, ThemeUICSSObject } from "theme-ui"
import Button from "../Button/Button"
import { SubNavigationMenuContext, useSubNavigationMenu } from "./Context"

interface SubNavigationMenuItemProps {
  children: ReactElement | string
  collapsedItem?: ReactElement | string
  onClick?: MouseEventHandler<HTMLLIElement>
  selected?: boolean
  styles?: {
    root: ThemeUICSSObject
    anchor: ThemeUICSSObject
  }
}

const SubNavigationMenuItem = ({
  children,
  collapsedItem,
  onClick,
  selected,
  styles,
}: SubNavigationMenuItemProps) => {
  const subNavigationMenuContext = useSubNavigationMenu()
  if (subNavigationMenuContext === null) {
    throw "<SubNavigationMenu.MenuItem> needs to be inside a <SubNavigationMenu> component"
  }
  const { collapsedHidden, isCollapsed } = subNavigationMenuContext

  useEffect(() => {
    if (!collapsedHidden && typeof children !== typeof collapsedItem)
      console.warn(
        "You must be consistent with the properties of children and the collapsed item, both strings or both elements"
      )
  }, [children, collapsedHidden, collapsedItem])

  const menuItem = useMemo((): ReactElement => {
    const defaultStyles: ThemeUICSSObject = {
      py: 2,
      whiteSpace: "nowrap",
      width: "100%",
      wordWrap: "initial",
      ...({
        default: {
          paddingLeft: 3,
          paddingRight: 9,
        },
        collapsed: {
          px: 2,
          textAlign: "center",
        },
      }[isCollapsed ? "collapsed" : "default"] as ThemeUICSSObject),
    }
    const item = (
      isCollapsed && !collapsedHidden ? collapsedItem : children
    ) as string | ReactElement
    if (typeof item === "string") {
      return <span sx={defaultStyles}>{item}</span>
    }
    return TUIjsx(item.type, {
      ...item.props,
      sx: { ...defaultStyles, ...item.props.sx },
    })
  }, [children, collapsedHidden, collapsedItem, isCollapsed])

  return (
    <li
      onClick={onClick}
      sx={{
        ...styles?.root,
        backgroundColor: selected ? "primary.alpha.90" : undefined,
        color: selected ? "primary" : undefined,
        cursor: "pointer",
        display: "flex",
        transition: "0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        transitionProperty: "background-color, color, padding, width",
        variant: selected ? "text.button1" : "text.body1",
        "&:hover": {
          backgroundColor: !selected ? "text.90" : undefined,
        },
        "& > a": {
          color: "inherit",
          textDecoration: "none",
        },
        ...{
          default: {
            borderTopLeftRadius: 2,
            borderBottomLeftRadius: 2,
            "&:after": selected
              ? {
                  content: '""',
                  backgroundColor: "primary",
                  borderTopLeftRadius: 1,
                  borderBottomLeftRadius: 1,
                  width: 4,
                }
              : undefined,
          },
          collapsed: {
            borderRadius: 2,
          },
        }[isCollapsed ? "collapsed" : "default"],
      }}
    >
      {menuItem}
    </li>
  )
}

export interface SubNavigationMenuProps {
  /** Description content */
  children: ReactElement[]

  /** Whether the component is hidden when collapsed or not */
  collapsedHidden?: boolean

  /** The amount of width for the collapsed menu */
  collapsedWidth?: number

  /** Whether the menu is collapsible or not */
  collapsible?: boolean

  /** Callback for collapse button click */
  onCollapseButtonClick?: (collapsed: boolean) => void

  /** Callback for collapse button hover */
  onCollapseButtonHover?: (isHovering: boolean) => void

  styles?: {
    root?: ThemeUICSSObject
    list?: ThemeUICSSObject
  }

  /** The amount of width for the non collapsed menu */
  width?: number
}

const SubNavigationMenu = ({
  children,
  collapsedHidden = true,
  collapsedWidth = 16,
  collapsible = true,
  onCollapseButtonClick,
  onCollapseButtonHover,
  styles,
  width = 164,
}: SubNavigationMenuProps) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)

  return (
    <nav
      sx={{
        ...styles?.root,
        backgroundColor: "transparent",
        position: "relative",
      }}
    >
      <SubNavigationMenuContext.Provider
        value={{ collapsedHidden, isCollapsed }}
      >
        <ul
          sx={{
            ...styles?.list,
            backgroundColor: "transparent",
            borderColor: "text.90",
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            flexWrap: "nowrap",
            listStyle: "none",
            margin: 0,
            minHeight: "100%",
            overflowX: "hidden",
            overflowY: "auto",
            paddingInlineStart: 6,
            transition: "opacity, width 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            ...({
              default: {
                width,
              },
              collapsed: {
                paddingInlineEnd: collapsedHidden ? 0 : 6,
                paddingInlineStart: collapsedHidden ? 0 : 6,
                opacity: collapsedHidden ? 0 : 1,
                width: collapsedWidth,
              },
            }[isCollapsed ? "collapsed" : "default"] as ThemeUICSSObject),
          }}
        >
          {children.map((child) =>
            cloneElement(child, { ...child.props, isCollapsed })
          )}
        </ul>
      </SubNavigationMenuContext.Provider>
      {collapsible && (
        <Button
          aria-label="toggle-collapse-navigation"
          color="text"
          iconName="IconArrowBarLeft"
          onClick={() => {
            onCollapseButtonClick?.(!isCollapsed)
            setIsCollapsed(!isCollapsed)
          }}
          onMouseEnter={() => {
            onCollapseButtonHover?.(true)
          }}
          onMouseLeave={() => {
            onCollapseButtonHover?.(false)
          }}
          size="small"
          styles={{
            icon: {
              transform: isCollapsed ? "scale(-1, 1)" : "scale(1, 1)",
              transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            },
          }}
          sx={{
            backgroundColor: "#ffffff",
            boxShadow: "0px 1px 12px rgba(29, 29, 29, 0.16)",
            padding: "6px",
            position: "absolute",
            right: "-14px",
            top: "calc(50% - 14px)",
            "&:hover": {
              color: "secondary",
            },
          }}
          variant="filled"
        />
      )}
    </nav>
  )
}

SubNavigationMenu.MenuItem = SubNavigationMenuItem

export default SubNavigationMenu
