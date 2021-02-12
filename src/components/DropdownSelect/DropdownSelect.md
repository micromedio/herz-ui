DropdownSelect default:

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

return <DropdownSelect options={options} />
```

DropdownSelect with label:

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

return <DropdownSelect label="Select an element:" options={options} />
```

DropdownSelect disabled:

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
  <DropdownSelect
    disabled={true}
    label="Select an element:"
    options={options}
  />
)
```

DropdownSelect with onChange event:

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
  <DropdownSelect
    onChange={({ selectedItem }) => alert("You selected: " + selectedItem)}
    label="Select an element:"
    options={options}
  />
)
```
