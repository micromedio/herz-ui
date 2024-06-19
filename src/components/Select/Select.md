Select example:

```js
<Select label="Select an element:">
  <Select.Option value={1}>Neptunium</Select.Option>
  <Select.Option value={2}>Plutonium</Select.Option>
  <Select.Option value={3}>Americium</Select.Option>
  <Select.Option value={4}>Curium</Select.Option>
  <Select.Option value={5}>Moscovium</Select.Option>
  <Select.Option value={6}>Livermorium</Select.Option>
  <Select.Option value={7}>Tennessine</Select.Option>
  <Select.Option value={8}>Oganesson</Select.Option>
</Select>
```

Select with multiple selections example:

```js
const [selectedItems, setSelectedItems] = React.useState([]);

return (
  <Select
    multi={true}
    label="Select one or multiple elements:"
    selectedItems={selectedItems}
    onSelectedItemsChange={(selectedItems) => setSelectedItems(selectedItems)}
  >
    <Select.Option value={1}>Neptunium</Select.Option>
    <Select.Option value={2}>Plutonium</Select.Option>
    <Select.Option value={3}>Americium</Select.Option>
    <Select.Option value={4}>Curium</Select.Option>
    <Select.Option value={5}>Moscovium</Select.Option>
    <Select.Option value={6}>Livermorium</Select.Option>
    <Select.Option value={7}>Tennessine</Select.Option>
    <Select.Option value={8}>Oganesson</Select.Option>
  </Select>
);
```

Select with onChange event:

```js
<Select
  label="Select an element:"
  onChange={(value) => alert('You selected: ' + value)}
>
  <Select.Option value={1}>Neptunium</Select.Option>
  <Select.Option value={2}>Plutonium</Select.Option>
  <Select.Option value={3}>Americium</Select.Option>
  <Select.Option value={4}>Curium</Select.Option>
  <Select.Option value={5}>Moscovium</Select.Option>
  <Select.Option value={6}>Livermorium</Select.Option>
  <Select.Option value={7}>Tennessine</Select.Option>
  <Select.Option value={8}>Oganesson</Select.Option>
</Select>
```

Select can render the label as a node to be able to customize it (we advise using it only on specific scenarios):

```js
import Icon from '../Icon/Icon';
<Select label="Select an option:">
  <Select.Option value={1}>
    <span style={{ display: 'flex', alignItems: 'center' }}>
      <Icon size={16} name="IconMinus" style={{ marginRight: '8px' }} />
      Minus
    </span>
  </Select.Option>
  <Select.Option value={2}>
    <span style={{ display: 'flex', alignItems: 'center' }}>
      <Icon size={16} name="IconPlus" style={{ marginRight: '8px' }} />
      Plus
    </span>
  </Select.Option>
</Select>;
```

Select disabled:

```js
<Select label="Select an element:" disabled>
  <Select.Option value={1}>Neptunium</Select.Option>
  <Select.Option value={2}>Plutonium</Select.Option>
</Select>
```
