Selector default:

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

return <Selector options={options} />
```

Selector with label:

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
    onChange={({ selectedItem }) => alert("You selected: " + selectedItem)}
    label="Select an element:"
    options={options}
  />
)
```
