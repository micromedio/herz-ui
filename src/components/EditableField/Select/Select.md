The EditableField.Select is used when the values in the field are known. It has the same API as the `Select` component, but with a few extra props to handle EditableField behaviour.

### Example
```jsx
import EditableField from '../EditableField'
const [value, setValue] = React.useState(1)
const [defaultValue, setDefaultValue] = React.useState(1)

;(
  <EditableField.Select
    value={value}
    defaultValue={defaultValue}
    onChange={(value) => setValue(value)}
    onSave={(newValue) => setDefaultValue(newValue)}
  >
    <EditableField.Select.Option value={1}>Neptunium</EditableField.Select.Option>
    <EditableField.Select.Option value={2}>Plutonium</EditableField.Select.Option>
    <EditableField.Select.Option value={3}>Americium</EditableField.Select.Option>
    <EditableField.Select.Option value={4}>Curium</EditableField.Select.Option>
  </EditableField.Select>
);
```

### States

#### Loading
```jsx
import EditableField from '../EditableField'
const [value, setValue] = React.useState(1)
const [defaultValue, setDefaultValue] = React.useState(1)

;(

  <EditableField.Select
    value={value}
    defaultValue={defaultValue}
    onChange={(value) => setValue(value)}
    onSave={(newValue) => setDefaultValue(newValue)}
    status="loading"
  >
    <EditableField.Select.Option value={1}>Neptunium</EditableField.Select.Option>
    <EditableField.Select.Option value={2}>Plutonium</EditableField.Select.Option>
    <EditableField.Select.Option value={3}>Americium</EditableField.Select.Option>
    <EditableField.Select.Option value={4}>Curium</EditableField.Select.Option>
  </EditableField.Select>
);
```

#### Error
```jsx
import EditableField from '../EditableField'
const [value, setValue] = React.useState(1)
const [defaultValue, setDefaultValue] = React.useState(1)

;(

  <EditableField.Select
    value={value}
    defaultValue={defaultValue}
    onChange={(value) => setValue(value)}
    onSave={(newValue) => setDefaultValue(newValue)}
    status="error"
    helperText="Something went wrong"
  >
    <EditableField.Select.Option value={1}>Neptunium</EditableField.Select.Option>
    <EditableField.Select.Option value={2}>Plutonium</EditableField.Select.Option>
    <EditableField.Select.Option value={3}>Americium</EditableField.Select.Option>
    <EditableField.Select.Option value={4}>Curium</EditableField.Select.Option>
  </EditableField.Select>
);
```

#### Success
```jsx
import EditableField from '../EditableField'
const [value, setValue] = React.useState(1)
const [defaultValue, setDefaultValue] = React.useState(1)

;(

  <EditableField.Select
    value={value}
    defaultValue={defaultValue}
    onChange={(value) => setValue(value)}
    onSave={(newValue) => setDefaultValue(newValue)}
    status="success"
    helperText="Changes have been saved"
  >
    <EditableField.Select.Option value={1}>Neptunium</EditableField.Select.Option>
    <EditableField.Select.Option value={2}>Plutonium</EditableField.Select.Option>
    <EditableField.Select.Option value={3}>Americium</EditableField.Select.Option>
    <EditableField.Select.Option value={4}>Curium</EditableField.Select.Option>
  </EditableField.Select>
);
```

### Saving Changes

#### Default
The component calls the `onSave` prop when the changes are supposed to be applied.

```jsx
import EditableField from '../EditableField'
const [value, setValue] = React.useState(1)
const [defaultValue, setDefaultValue] = React.useState(1)

;(

  <EditableField.Select
    value={value}
    defaultValue={defaultValue}
    onChange={(value) => setValue(value)}
    onSave={(newValue) => {
      setDefaultValue(newValue)
      alert(`Saved value: ${newValue}`)
    }}
  >
    <EditableField.Select.Option value={1}>Neptunium</EditableField.Select.Option>
    <EditableField.Select.Option value={2}>Plutonium</EditableField.Select.Option>
    <EditableField.Select.Option value={3}>Americium</EditableField.Select.Option>
    <EditableField.Select.Option value={4}>Curium</EditableField.Select.Option>
  </EditableField.Select>
);
```

#### Save on Blur (Losing Focus)
By default the `onSave` callback is only called when the save (check) button is clicked. However this can be changed with the `saveOnBlur` prop


```jsx
import EditableField from '../EditableField'
const [value, setValue] = React.useState(1)
const [defaultValue, setDefaultValue] = React.useState(1)

;(
  <EditableField.Select
    value={value}
    defaultValue={defaultValue}
    onChange={(value) => setValue(value)}
    saveOnBlur
    onSave={(newValue) => {
      setDefaultValue(newValue)
      alert(`Saved value: ${newValue}`)
    }}
  >
    <EditableField.Select.Option value={1}>Neptunium</EditableField.Select.Option>
    <EditableField.Select.Option value={2}>Plutonium</EditableField.Select.Option>
    <EditableField.Select.Option value={3}>Americium</EditableField.Select.Option>
    <EditableField.Select.Option value={4}>Curium</EditableField.Select.Option>
  </EditableField.Select>
);
```

#### Disable Reset on Blur (Losing Focus)
By default the select value is reset to the initial value when the select loses focus. However this can be changed with the `resetOnBlur` prop

```jsx
import EditableField from '../EditableField'
const [value, setValue] = React.useState(1)
const [defaultValue, setDefaultValue] = React.useState(1)

;(

  <EditableField.Select
    value={value}
    defaultValue={defaultValue}
    onChange={(value) => setValue(value)}
    resetOnBlur={false}
    onSave={(newValue) => {
      setDefaultValue(newValue)
      alert(`Saved value: ${newValue}`)
    }}
  >
    <EditableField.Select.Option value={1}>Neptunium</EditableField.Select.Option>
    <EditableField.Select.Option value={2}>Plutonium</EditableField.Select.Option>
    <EditableField.Select.Option value={3}>Americium</EditableField.Select.Option>
    <EditableField.Select.Option value={4}>Curium</EditableField.Select.Option>
  </EditableField.Select>
);
```
