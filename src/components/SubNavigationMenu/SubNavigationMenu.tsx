/** @jsxImportSource theme-ui */
import { ReactElement, MouseEventHandler, useState, cloneElement } from "react"
import { ThemeUICSSObject } from "theme-ui"
import Button from "../Button/Button"
import { SubNavigationMenuContext, useSubNavigationMenu } from "./Context"

interface SubNavigationMenuItemProps {
  children?: ReactElement
  label: string
  onClick?: MouseEventHandler<HTMLLIElement>
  selected?: boolean
  styles?: {
    root: ThemeUICSSObject
    anchor: ThemeUICSSObject
  }
}

const SubNavigationMenuItem = ({
  children,
  label,
  onClick,
  selected,
  styles,
}: SubNavigationMenuItemProps) => {
  const { isCollapsed } = useSubNavigationMenu()

  return (
    <li
      onClick={onClick}
      sx={{
        ...styles?.root,
        backgroundColor: selected ? "primary.alpha.90" : undefined,
        color: selected ? "primary" : undefined,
        cursor: "pointer",
        display: "flex",
        transition:
          "background, color, padding, width 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        variant: selected ? "text.button1" : "text.body1",
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
      {children || (
        <span
          sx={{
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
          }}
        >
          {label}
        </span>
      )}
    </li>
  )
}

export interface SubNavigationMenuProps {
  /** Description content */
  children: ReactElement[]

  collapsedHidden?: boolean

  collapsedWidth?: number

  collapsible?: boolean

  onCollapseButtonClick?: (collapsed: boolean) => void

  styles?: {
    root?: ThemeUICSSObject
    list?: ThemeUICSSObject
  }

  width?: number
}

const SubNavigationMenu = ({
  children,
  collapsedHidden = false,
  collapsedWidth = 84,
  collapsible = true,
  onCollapseButtonClick,
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
        width: "100%",
      }}
    >
      <SubNavigationMenuContext.Provider value={{ isCollapsed }}>
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
            transition: "width 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            ...({
              default: {
                width,
              },
              collapsed: {
                paddingInlineEnd: collapsedHidden ? 0 : 6,
                paddingInlineStart: collapsedHidden ? 0 : 6,
                visibility: collapsedHidden ? "hidden" : "visible",
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
