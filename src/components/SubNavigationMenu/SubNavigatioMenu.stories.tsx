/** @jsxImportSource theme-ui */
import SubNavigationMenu, { SubNavigationMenuProps } from "./SubNavigationMenu"
import { Meta, Story } from "@storybook/react/types-6-0"
import { useState } from "react"

export default {
  title: "Design System/SubNavigationMenu",
  component: SubNavigationMenu,
  decorators: [
    (Story) => (
      <div sx={{ maxWidth: "auto", width: "fit-content" }}>
        <Story />
      </div>
    ),
  ],
} as Meta

const nonCollapsed = ["License types", "Licenses"]
const collapsed = ["LT", "L"]

const Template: Story<SubNavigationMenuProps> = (props) => {
  const [selected, setSelected] = useState("License types")
  const [items, setItems] = useState(nonCollapsed)
  return (
    <SubNavigationMenu
      {...props}
      onCollapseButtonClick={(isCollapsed) => {
        setItems(isCollapsed ? collapsed : nonCollapsed)
      }}
    >
      {items.map((item, index) => (
        <SubNavigationMenu.MenuItem
          key={item}
          label={item}
          onClick={(event) => {
            setSelected(event.currentTarget.textContent as string)
          }}
          selected={[collapsed[index], nonCollapsed[index]].includes(selected)}
        />
      ))}
    </SubNavigationMenu>
  )
}

const TemplateWithChildren: Story<SubNavigationMenuProps> = (props) => {
  const [selected, setSelected] = useState("License types")
  const [items, setItems] = useState(nonCollapsed)

  return (
    <SubNavigationMenu
      {...props}
      onCollapseButtonClick={(isCollapsed) => {
        setItems(isCollapsed ? collapsed : nonCollapsed)
      }}
    >
      {items.map((item, index) => (
        <SubNavigationMenu.MenuItem
          key={item}
          label={item}
          onClick={(event) => {
            setSelected(event.currentTarget.textContent as string)
          }}
          selected={[collapsed[index], nonCollapsed[index]].includes(selected)}
        >
          <a
            sx={{
              py: 2,
              paddingLeft: 3,
              paddingRight: 9,
              whiteSpace: "nowrap",
              width: "100%",
            }}
          >
            {item}
          </a>
        </SubNavigationMenu.MenuItem>
      ))}
    </SubNavigationMenu>
  )
}

// Each story then reuses that template
export const Default = Template.bind({})

export const WithChildren = TemplateWithChildren.bind({})

export const CustomWidth = Template.bind({})
CustomWidth.args = {
  collapsedWidth: 100,
  width: 300,
}

export const NonCollapsible = Template.bind({})
NonCollapsible.args = {
  collapsible: false,
  width: 300,
}
