DropdownSelect default:

```js
const options = [
  "Neptunium",
  "Plutonium",
  "Americium",
  "Curium",
  "Moscovium",
  "Livermorium",
  "Tennessine",
  "Oganesson",
]

return <DropdownSelect options={options} />
```

DropdownSelect with label:

```js
const options = [
  "Neptunium",
  "Plutonium",
  "Americium",
  "Curium",
  "Berkelium",
  "Californium",
  "Einsteinium",
  "Fermium",
]

return <DropdownSelect label="Select an element:" options={options} />
```

DropdownSelect with onChange event:

```js
const options = [
  "Neptunium",
  "Plutonium",
  "Americium",
  "Curium",
  "Berkelium",
  "Californium",
  "Einsteinium",
  "Fermium",
]

return (
  <DropdownSelect
    onChange={({ selectedItem }) => alert("You selected: " + selectedItem)}
    label="Select an element:"
    options={options}
  />
)
```
