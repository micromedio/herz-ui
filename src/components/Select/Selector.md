Select example:

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

return <Select label="Select an element:" options={options} />
```

Select with multiple selections example:

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
  <Select
    multi={true}
    label="Select one or multiple elements:"
    options={options}
    selectedItems={selectedItems}
    onSelectedItemsChange={(selectedItems) => setSelectedItems(selectedItems)}
  />
)
```

Select with onChange event:

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
  <Select
    onChange={(value) => alert("You selected: " + value)}
    label="Select an element:"
    options={options}
  />
)
```

Select can render the label as a node to be able to customize it (we advise using it only on specific scenarios):

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

;<Select label="Select an option:" options={options} />
```

Select disabled:

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

return <Select disabled={true} label="Select an element:" options={options} />
```
