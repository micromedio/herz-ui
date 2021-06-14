/** @jsxImportSource theme-ui */
import SubNavigationMenu, { SubNavigationMenuProps } from "./SubNavigationMenu"
import { Meta, Story } from "@storybook/react/types-6-0"
import { ReactElement, ReactNode, useMemo, useState } from "react"
import { Link, MemoryRouter, Redirect, Route, Switch } from "react-router-dom"
import Button from "../Button/Button"

export default {
  title: "Design System/SubNavigationMenu",
  component: SubNavigationMenu,
} as Meta

const SubNavigationMenuWrapper = ({
  children,
  content,
  isHovering,
}: {
  children: ReactNode
  content?: ReactElement
  isHovering: boolean
}): ReactElement => {
  return (
    <div
      sx={{ backgroundColor: "#F9F9F9", display: "flex", flexWrap: "nowrap" }}
    >
      <div
        sx={{
          borderRight: "1px solid #e8e8e8",
          display: "flex",
          flexDirection: "column",
          padding: 8,
          gap: 8,
        }}
      >
        <Button iconName="IconAffiliate" />
        <Button iconName="IconLicense" />
      </div>
      {children}
      <div
        sx={{
          backgroundColor: "#ffffff",
          borderBottomLeftRadius: 8,
          borderTopLeftRadius: 8,
          boxShadow: isHovering
            ? "0 1px 0 #0082FC inset, 1px 0 0 #0082FC inset"
            : undefined,
          flexGrow: 1,
          height: 300,
          padding: 8,
          transition: "box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {content || "Content"}
      </div>
    </div>
  )
}

const Template: Story<SubNavigationMenuProps> = (props) => {
  const [selected, setSelected] = useState("License types")
  const [isHovering, setIsHovering] = useState(false)

  const menuItems = useMemo(
    () =>
      [
        {
          label: "License types",
          collapsedLabel: "LT",
        },
        {
          label: "Licenses",
          collapsedLabel: "L",
        },
      ].map((item) => (
        <SubNavigationMenu.MenuItem
          key={item.label}
          collapsedItem={item.collapsedLabel}
          onClick={(event) => {
            setSelected(event.currentTarget.textContent as string)
          }}
          selected={[item.label, item.collapsedLabel].includes(selected)}
        >
          {item.label}
        </SubNavigationMenu.MenuItem>
      )),
    [selected]
  )
  return (
    <SubNavigationMenuWrapper isHovering={isHovering}>
      <SubNavigationMenu
        {...props}
        onCollapseButtonHover={(hover) => setIsHovering(hover)}
        styles={{ root: { py: 8 } }}
      >
        {menuItems}
      </SubNavigationMenu>
    </SubNavigationMenuWrapper>
  )
}

const TemplateWithThirdPartyRouter: Story<SubNavigationMenuProps> = (props) => {
  const [selected, setSelected] = useState("License types")
  const [isHovering, setIsHovering] = useState(false)

  const menuItems = useMemo(
    () =>
      [
        {
          label: "License types",
          collapsedLabel: "LT",
        },
        {
          label: "Licenses",
          collapsedLabel: "L",
        },
      ].map((item) => (
        <SubNavigationMenu.MenuItem
          key={item.label}
          collapsedItem={
            <Link to={`/${item.label.toLocaleLowerCase().replace(" ", "")}`}>
              {item.collapsedLabel}
            </Link>
          }
          onClick={(event) => {
            setSelected(event.currentTarget.textContent as string)
          }}
          selected={[item.label, item.collapsedLabel].includes(selected)}
        >
          <Link to={`/${item.label.toLocaleLowerCase().replace(" ", "")}`}>
            {item.label}
          </Link>
        </SubNavigationMenu.MenuItem>
      )),
    [selected]
  )

  return (
    <MemoryRouter>
      <Redirect exact from="/" to="licensetypes" />
      <SubNavigationMenuWrapper
        content={
          <Switch>
            <Route path="/licensetypes">License Types Content</Route>
            <Route path="/licenses">Licenses Content</Route>
          </Switch>
        }
        isHovering={isHovering}
      >
        <SubNavigationMenu
          {...props}
          onCollapseButtonHover={(hover) => setIsHovering(hover)}
          styles={{ root: { py: 8 } }}
        >
          {menuItems}
        </SubNavigationMenu>
      </SubNavigationMenuWrapper>
    </MemoryRouter>
  )
}

// Each story then reuses that template
export const Default = Template.bind({})

export const WithThirdPartyRouter = TemplateWithThirdPartyRouter.bind({})

export const CustomWidth = Template.bind({})
CustomWidth.args = {
  collapsedWidth: 100,
  width: 300,
}

export const ShortLabels = Template.bind({})
ShortLabels.args = {
  collapsedHidden: false,
  collapsedWidth: 100,
  width: 300,
}

export const NonCollapsible = Template.bind({})
NonCollapsible.args = {
  collapsible: false,
  width: 300,
}
