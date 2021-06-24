The EditableField.Text is used to simulate an input.

### Example
```jsx
import EditableField from '../EditableField'
const [value, setValue] = React.useState("Herz-UI")
const [defaultValue, setDefaultValue] = React.useState("Herz-UI")

;(
  <EditableField.Text
    value={value}
    defaultValue={defaultValue}
    onChange={(event) => setValue(event.target.value)}
    onSave={(newValue) => setDefaultValue(newValue)}
  />
);
```

### States

#### Loading
```jsx
import EditableField from '../EditableField'
const [value, setValue] = React.useState("Herz-UI")
const [defaultValue, setDefaultValue] = React.useState("Herz-UI")

;(
  <EditableField.Text
    value={value}
    defaultValue={defaultValue}
    onChange={(event) => setValue(event.target.value)}
    onSave={(newValue) => setDefaultValue(newValue)}
    status="loading"
  />
);
```

#### Error
```jsx
import EditableField from '../EditableField'
const [value, setValue] = React.useState("Herz-UI")
const [defaultValue, setDefaultValue] = React.useState("Herz-UI")

;(
  <EditableField.Text
    value={value}
    defaultValue={defaultValue}
    onChange={(event) => setValue(event.target.value)}
    onSave={(newValue) => setDefaultValue(newValue)}
    status="error"
    helperText="Something went wrong"
  />
);
```

#### Success
```jsx
import EditableField from '../EditableField'
const [value, setValue] = React.useState("Herz-UI")
const [defaultValue, setDefaultValue] = React.useState("Herz-UI")

;(
  <EditableField.Text
    value={value}
    defaultValue={defaultValue}
    onChange={(event) => setValue(event.target.value)}
    onSave={(newValue) => setDefaultValue(newValue)}
    status="success"
    helperText="Changes have been saved"
  />
);
```

### Saving Changes

#### Default
The component calls the `onSave` prop when the changes are supposed to be applied.

```jsx
import EditableField from '../EditableField'
const [value, setValue] = React.useState("Herz-UI")
const [defaultValue, setDefaultValue] = React.useState("Herz-UI")

;(
  <EditableField.Text
    value={value}
    defaultValue={defaultValue}
    onChange={(event) => setValue(event.target.value)}
    onSave={(newValue) => {
      setDefaultValue(newValue)
      alert(`Saved value: ${newValue}`)
    }}
  />
);
```

#### Save on Blur (Losing Focus)
By default the `onSave` callback is only called when the save (check) button is clicked. However this can be changed with the `saveOnBlur` prop


```jsx
import EditableField from '../EditableField'
const [value, setValue] = React.useState("Herz-UI")
const [defaultValue, setDefaultValue] = React.useState("Herz-UI")

;(
  <EditableField.Text
    value={value}
    defaultValue={defaultValue}
    onChange={(event) => setValue(event.target.value)}
    saveOnBlur
    onSave={(newValue) => {
      setDefaultValue(newValue)
      alert(`Saved value: ${newValue}`)
    }}
  />
);
```

#### Disable Reset on Blur (Losing Focus)
By default the input value is reset to the initial value when the input loses focus. However this can be changed with the `resetOnBlur` prop

```jsx
import EditableField from '../EditableField'
const [value, setValue] = React.useState("Herz-UI")
const [defaultValue, setDefaultValue] = React.useState("Herz-UI")

;(
  <EditableField.Text
    value={value}
    defaultValue={defaultValue}
    onChange={(event) => setValue(event.target.value)}
    resetOnBlur={false}
    onSave={(newValue) => {
      setDefaultValue(newValue)
      alert(`Saved value: ${newValue}`)
    }}
  />
);
```

### Example With Text Area
All previous examples can be used as text area too; to achieve that behavior, send the multiline prop as true
```jsx
import EditableField from '../EditableField'
const [value, setValue] = React.useState("Herz-UI\nTextArea")
const [defaultValue, setDefaultValue] = React.useState("Herz-UI\nTextArea")

;(
  <EditableField.Text
    value={value}
    defaultValue={defaultValue}
    onChange={(event) => setValue(event.target.value)}
    onSave={(newValue) => setDefaultValue(newValue)}
    multiline
    rows={2}
  />
);
```
