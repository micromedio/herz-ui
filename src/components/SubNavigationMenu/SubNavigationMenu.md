
#### Default

```jsx
import { useMemo, useState } from "react"
import Button from "../Button/Button"
const items = useMemo(() => [
  {
    label: "License types",
    collapsedLabel: "LT",
  },
  {
    label: "Licenses",
    collapsedLabel: "L",
  },
], [])
const [selected, setSelected] = useState("License types")
const [isHovering, setIsHovering] = useState(false)
;(
  <div
    style={{ backgroundColor: "#F9F9F9", display: "flex", flexWrap: "nowrap" }}
  >
    <div
      style={{
        borderRight: "1px solid #e8e8e8",
        display: "flex",
        flexDirection: "column",
        padding: 32,
        gap: 32,
      }}
    >
      <Button iconName="IconAffiliate" />
      <Button iconName="IconLicense" />
    </div>
    <SubNavigationMenu
      {...props}
      onCollapseButtonHover={(hover) => setIsHovering(hover)}
      styles={{ root: { py: 8 } }}
    >
      {items.map((item, index) => (
        <SubNavigationMenu.MenuItem
          key={item.label}
          collapsedItem={item.collapsedLabel}
          onClick={(event) => {
            setSelected(event.currentTarget.textContent)
          }}
          selected={[item.label, item.collapsedLabel].includes(selected)}
        >
          {item.label}
        </SubNavigationMenu.MenuItem>
      ))}
    </SubNavigationMenu>
    <div
      style={{
        backgroundColor: "#ffffff",
        borderBottomLeftRadius: 32,
        borderTopLeftRadius: 32,
        boxShadow: isHovering ? "0 2px 0 #B2D9FE inset, 2px 0 0 #B2D9FE inset" : undefined,
        flexGrow: 1,
        height: 300,
        padding: 32,
        transition: "0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      Content
    </div>
  </div>
)
```

#### With Third Party Router

```jsx
import { useMemo, useState } from "react"
import { Link, MemoryRouter, Redirect, Route, Switch } from "react-router-dom"
import Button from "../Button/Button"
const items = useMemo(() => [
  {
    label: "License types",
    collapsedLabel: "LT",
  },
  {
    label: "Licenses",
    collapsedLabel: "L",
  },
], [])
const [selected, setSelected] = useState("License types")
const [isHovering, setIsHovering] = useState(false)
;(
  <MemoryRouter>
    <Redirect exact from="/" to="licensetypes" />
    <div
      style={{ backgroundColor: "#F9F9F9", display: "flex", flexWrap: "nowrap" }}
    >
      <div
        style={{
          borderRight: "1px solid #e8e8e8",
          display: "flex",
          flexDirection: "column",
          padding: 32,
          gap: 32,
        }}
      >
        <Button iconName="IconAffiliate" />
        <Button iconName="IconLicense" />
      </div>
      <SubNavigationMenu
        {...props}
        onCollapseButtonHover={(hover) => setIsHovering(hover)}
        styles={{ root: { py: 8 } }}
      >
        {items.map((item, index) => (
          <SubNavigationMenu.MenuItem
            key={item.label}
            collapsedItem={
              <Link to={`/${item.label.toLocaleLowerCase().replace(" ", "")}`}>
                {item.collapsedLabel}
              </Link>
            }
            onClick={(event) => {
              setSelected(event.currentTarget.textContent)
            }}
            selected={[item.label, item.collapsedLabel].includes(selected)}
          >
            <Link to={`/${item.label.toLocaleLowerCase().replace(" ", "")}`}>
              {item.label}
            </Link>
          </SubNavigationMenu.MenuItem>
        ))}
      </SubNavigationMenu>
      <div
        style={{
          backgroundColor: "#ffffff",
          borderBottomLeftRadius: 32,
          borderTopLeftRadius: 32,
          boxShadow: isHovering ? "0 2px 0 #B2D9FE inset, 2px 0 0 #B2D9FE inset" : undefined,
          flexGrow: 1,
          height: 300,
          padding: 32,
          transition: "0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <Switch>
          <Route path="/licensetypes">License Types Content</Route>
          <Route path="/licenses">Licenses Content</Route>
        </Switch>
      </div>
    </div>
  </MemoryRouter>
)
```

#### Custom Width

```jsx
import { useMemo, useState } from "react"
import Button from "../Button/Button"
const items = useMemo(() => [
  {
    label: "License types",
    collapsedLabel: "LT",
  },
  {
    label: "Licenses",
    collapsedLabel: "L",
  },
], [])
const [selected, setSelected] = useState("License types")
const [isHovering, setIsHovering] = useState(false)
;(
  <div
    style={{ backgroundColor: "#F9F9F9", display: "flex", flexWrap: "nowrap" }}
  >
    <div
      style={{
        borderRight: "1px solid #e8e8e8",
        display: "flex",
        flexDirection: "column",
        padding: 32,
        gap: 32,
      }}
    >
      <Button iconName="IconAffiliate" />
      <Button iconName="IconLicense" />
    </div>
    <SubNavigationMenu
      {...props}
      collapsedWidth={100}
      onCollapseButtonHover={(hover) => setIsHovering(hover)}
      styles={{ root: { py: 8 } }}
      width={300}
    >
      {items.map((item, index) => (
        <SubNavigationMenu.MenuItem
          key={item.label}
          collapsedItem={item.collapsedLabel}
          onClick={(event) => {
            setSelected(event.currentTarget.textContent)
          }}
          selected={[item.label, item.collapsedLabel].includes(selected)}
        >
          {item.label}
        </SubNavigationMenu.MenuItem>
      ))}
    </SubNavigationMenu>
    <div
      style={{
        backgroundColor: "#ffffff",
        borderBottomLeftRadius: 32,
        borderTopLeftRadius: 32,
        boxShadow: isHovering ? "0 2px 0 #B2D9FE inset, 2px 0 0 #B2D9FE inset" : undefined,
        flexGrow: 1,
        height: 300,
        padding: 32,
        transition: "0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      Content
    </div>
  </div>
)
```

#### Short Labels

```jsx
import { useMemo, useState } from "react"
import Button from "../Button/Button"
const items = useMemo(() => [
  {
    label: "License types",
    collapsedLabel: "LT",
  },
  {
    label: "Licenses",
    collapsedLabel: "L",
  },
], [])
const [selected, setSelected] = useState("License types")
const [isHovering, setIsHovering] = useState(false)
;(
  <div
    style={{ backgroundColor: "#F9F9F9", display: "flex", flexWrap: "nowrap" }}
  >
    <div
      style={{
        borderRight: "1px solid #e8e8e8",
        display: "flex",
        flexDirection: "column",
        padding: 32,
        gap: 32,
      }}
    >
      <Button iconName="IconAffiliate" />
      <Button iconName="IconLicense" />
    </div>
    <SubNavigationMenu
      {...props}
      collapsedHidden={false}
      collapsedWidth={100}
      onCollapseButtonHover={(hover) => setIsHovering(hover)}
      styles={{ root: { py: 8 } }}
      width={300}
    >
      {items.map((item, index) => (
        <SubNavigationMenu.MenuItem
          key={item.label}
          collapsedItem={item.collapsedLabel}
          onClick={(event) => {
            setSelected(event.currentTarget.textContent)
          }}
          selected={[item.label, item.collapsedLabel].includes(selected)}
        >
          {item.label}
        </SubNavigationMenu.MenuItem>
      ))}
    </SubNavigationMenu>
    <div
      style={{
        backgroundColor: "#ffffff",
        borderBottomLeftRadius: 32,
        borderTopLeftRadius: 32,
        boxShadow: isHovering ? "0 2px 0 #B2D9FE inset, 2px 0 0 #B2D9FE inset" : undefined,
        flexGrow: 1,
        height: 300,
        padding: 32,
        transition: "0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      Content
    </div>
  </div>
)
```

#### Non Collapsible

```jsx
import { useMemo, useState } from "react"
import Button from "../Button/Button"
const items = useMemo(() => [
  {
    label: "License types",
    collapsedLabel: "LT",
  },
  {
    label: "Licenses",
    collapsedLabel: "L",
  },
], [])
const [selected, setSelected] = useState("License types")
const [isHovering, setIsHovering] = useState(false)
;(
  <div
    style={{ backgroundColor: "#F9F9F9", display: "flex", flexWrap: "nowrap" }}
  >
    <div
      style={{
        borderRight: "1px solid #e8e8e8",
        display: "flex",
        flexDirection: "column",
        padding: 32,
        gap: 32,
      }}
    >
      <Button iconName="IconAffiliate" />
      <Button iconName="IconLicense" />
    </div>
    <SubNavigationMenu
      {...props}
      collapsible={false}
      onCollapseButtonHover={(hover) => setIsHovering(hover)}
      styles={{ root: { py: 8 } }}
      width={300}
    >
      {items.map((item, index) => (
        <SubNavigationMenu.MenuItem
          key={item.label}
          collapsedItem={item.collapsedLabel}
          onClick={(event) => {
            setSelected(event.currentTarget.textContent)
          }}
          selected={[item.label, item.collapsedLabel].includes(selected)}
        >
          {item.label}
        </SubNavigationMenu.MenuItem>
      ))}
    </SubNavigationMenu>
    <div
      style={{
        backgroundColor: "#ffffff",
        borderBottomLeftRadius: 32,
        borderTopLeftRadius: 32,
        boxShadow: isHovering ? "0 2px 0 #B2D9FE inset, 2px 0 0 #B2D9FE inset" : undefined,
        flexGrow: 1,
        height: 300,
        padding: 32,
        transition: "0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      Content
    </div>
  </div>
)
```
