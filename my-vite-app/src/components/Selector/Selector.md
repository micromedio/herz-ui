Selector example:

```js
const options = [
  { value: 1, label: "Neptunium" },
  { value: 2, label: "Plutonium" },
  { value: 3, label: "Americium" },
  { value: 4, label: "Curium" },
  { value: 5, label: "Moscovium" },
  { value: 6, label: "Livermorium" },
  { value: 7, label: "Tennessine" },
  { value: 8, label: "Oganesson" },
]

return <Selector label="Select an element:" options={options} />
```

Selector with multiple selections example:

```js
const [selectedItems, setSelectedItems] = React.useState([])

const options = [
  { value: 1, label: "Neptunium" },
  { value: 2, label: "Plutonium" },
  { value: 3, label: "Americium" },
  { value: 4, label: "Curium" },
  { value: 5, label: "Moscovium" },
  { value: 6, label: "Livermorium" },
  { value: 7, label: "Tennessine" },
  { value: 8, label: "Oganesson" },
]

return (
  <Selector
    multi={true}
    label="Select one or multiple elements:"
    options={options}
    selectedItems={selectedItems}
    onSelectedItemsChange={(selectedItems) => setSelectedItems(selectedItems)}
  />
)
```

Selector with onChange event:

```js
const options = [
  { value: 1, label: "Neptunium" },
  { value: 2, label: "Plutonium" },
  { value: 3, label: "Americium" },
  { value: 4, label: "Curium" },
  { value: 5, label: "Moscovium" },
  { value: 6, label: "Livermorium" },
  { value: 7, label: "Tennessine" },
  { value: 8, label: "Oganesson" },
]

return (
  <Selector
    onChange={(value) => alert("You selected: " + value)}
    label="Select an element:"
    options={options}
  />
)
```

Selector can render the label as a node to be able to customize it (we advise using it only on specific scenarios):

```js
import Icon from "../Icon/Icon"

const options = [
  {
    value: 1,
    label: (
      <span style={{ display: "flex", alignItems: "center" }}>
        <Icon size={16} name="IconMinus" style={{ marginRight: "8px" }} />
        Minus
      </span>
    ),
  },
  {
    value: 2,
    label: (
      <span style={{ display: "flex", alignItems: "center" }}>
        <Icon size={16} name="IconPlus" style={{ marginRight: "8px" }} />
        Plus
      </span>
    ),
  },
]

;<Selector label="Select an option:" options={options} />
```

Selector disabled:

```js
const options = [
  { value: 1, label: "Neptunium" },
  { value: 2, label: "Plutonium" },
  { value: 3, label: "Americium" },
  { value: 4, label: "Curium" },
  { value: 5, label: "Moscovium" },
  { value: 6, label: "Livermorium" },
  { value: 7, label: "Tennessine" },
  { value: 8, label: "Oganesson" },
]

return <Selector disabled={true} label="Select an element:" options={options} />
```
