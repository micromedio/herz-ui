
#### Default

```jsx
import { useMemo, useState } from "react"
const nonCollapsed = useMemo(() => ["License types", "Licenses"], [])
const collapsed = useMemo(() => ["LT", "L"], [])
const [selected, setSelected] = useState("License types")
const [items, setItems] = useState(nonCollapsed)
;(
  <div style={{ maxWidth: "auto", width: "fit-content" }}>
    <SubNavigationMenu
      onCollapseButtonClick={(isCollapsed) => {
        setItems(isCollapsed ? collapsed : nonCollapsed)
      }}
    >
      {items.map((item, index) => (
        <SubNavigationMenu.MenuItem
          key={item}
          label={item}
          onClick={(event) => {
            setSelected(event.currentTarget.textContent)
          }}
          selected={[collapsed[index], nonCollapsed[index]].includes(selected)}
        />
      ))}
    </SubNavigationMenu>
  </div>
)
```

#### With Children

```jsx
import { useMemo, useState } from "react"
const nonCollapsed = useMemo(() => ["License types", "Licenses"], [])
const collapsed = useMemo(() => ["LT", "L"], [])
const [selected, setSelected] = useState("License types")
const [items, setItems] = useState(nonCollapsed)
;(
  <div style={{ maxWidth: "auto", width: "fit-content" }}>
    <SubNavigationMenu
      onCollapseButtonClick={(isCollapsed) => {
        setItems(isCollapsed ? collapsed : nonCollapsed)
      }}
    >
      {items.map((item, index) => (
        <SubNavigationMenu.MenuItem
          key={item}
          label={item}
          onClick={(event) => {
            setSelected(event.currentTarget.textContent)
          }}
          selected={[collapsed[index], nonCollapsed[index]].includes(selected)}
        >
          <a
            style={{
              padding: `8px 36px 8px 12px`,
              whiteSpace: "nowrap",
              width: "100%",
            }}
          >
            {item}
          </a>
        </SubNavigationMenu.MenuItem>
      ))}
    </SubNavigationMenu>
  </div>
)
```

#### Custom Width

```jsx
import { useMemo, useState } from "react"
const nonCollapsed = useMemo(() => ["License types", "Licenses"], [])
const collapsed = useMemo(() => ["LT", "L"], [])
const [selected, setSelected] = useState("License types")
const [items, setItems] = useState(nonCollapsed)
;(
  <div style={{ maxWidth: "auto", width: "fit-content" }}>
    <SubNavigationMenu
      collapsedWidth={100}
      onCollapseButtonClick={(isCollapsed) => {
        setItems(isCollapsed ? collapsed : nonCollapsed)
      }}
      width={300}
    >
      {items.map((item, index) => (
        <SubNavigationMenu.MenuItem
          key={item}
          label={item}
          onClick={(event) => {
            setSelected(event.currentTarget.textContent)
          }}
          selected={[collapsed[index], nonCollapsed[index]].includes(selected)}
        />
      ))}
    </SubNavigationMenu>
  </div>
)
```

#### Non Collapsible

```jsx
import { useMemo, useState } from "react"
const nonCollapsed = useMemo(() => ["License types", "Licenses"], [])
const collapsed = useMemo(() => ["LT", "L"], [])
const [selected, setSelected] = useState("License types")
const [items, setItems] = useState(nonCollapsed)
;(
  <div style={{ maxWidth: "auto", width: "fit-content" }}>
    <SubNavigationMenu
      collapsible={false}
      onCollapseButtonClick={(isCollapsed) => {
        setItems(isCollapsed ? collapsed : nonCollapsed)
      }}
      width={300}
    >
      {items.map((item, index) => (
        <SubNavigationMenu.MenuItem
          key={item}
          label={item}
          onClick={(event) => {
            setSelected(event.currentTarget.textContent)
          }}
          selected={[collapsed[index], nonCollapsed[index]].includes(selected)}
        />
      ))}
    </SubNavigationMenu>
  </div>
)
```
