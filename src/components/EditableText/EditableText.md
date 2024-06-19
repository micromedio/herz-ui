The EditableText component is used when you want to display values of an entity in a way that it looks like normal text, while allowing the user to click on it to edit as an input and save/discard changes.

### Example

```jsx
const [value, setValue] = React.useState('Herz-UI');
const [defaultValue, setDefaultValue] = React.useState('Herz-UI');

return (
  <EditableText
    value={value}
    defaultValue={defaultValue}
    onChange={(newValue) => setValue(newValue)}
    onSave={(newValue) => setDefaultValue(newValue)}
  />
);
```

### States

#### Loading

```jsx
const [value, setValue] = React.useState('Herz-UI');
const [defaultValue, setDefaultValue] = React.useState('Herz-UI');

return (
  <EditableText
    value={value}
    defaultValue={defaultValue}
    onChange={(newValue) => setValue(newValue)}
    onSave={(newValue) => setDefaultValue(newValue)}
    status="loading"
  />
);
```

#### Error

```jsx
const [value, setValue] = React.useState('Herz-UI');
const [defaultValue, setDefaultValue] = React.useState('Herz-UI');

return (
  <EditableText
    value={value}
    defaultValue={defaultValue}
    onChange={(newValue) => setValue(newValue)}
    onSave={(newValue) => setDefaultValue(newValue)}
    status="error"
    helperText="Something went wrong"
  />
);
```

#### Success

```jsx
const [value, setValue] = React.useState('Herz-UI');
const [defaultValue, setDefaultValue] = React.useState('Herz-UI');

return (
  <EditableText
    value={value}
    defaultValue={defaultValue}
    onChange={(newValue) => setValue(newValue)}
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
const [value, setValue] = React.useState('Herz-UI');
const [defaultValue, setDefaultValue] = React.useState('Herz-UI');

return (
  <EditableText
    value={value}
    defaultValue={defaultValue}
    onChange={(newValue) => setValue(newValue)}
    onSave={(newValue) => {
      setDefaultValue(newValue);
      alert(`Saved value: ${newValue}`);
    }}
  />
);
```

#### Save on Blur (Losing Focus)

By default the `onSave` callback is only called when the save (check) button is clicked. However this can be changed with the `saveOnBlur` prop

```jsx
const [value, setValue] = React.useState('Herz-UI');
const [defaultValue, setDefaultValue] = React.useState('Herz-UI');

return (
  <EditableText
    value={value}
    defaultValue={defaultValue}
    onChange={(newValue) => setValue(newValue)}
    saveOnBlur
    onSave={(newValue) => {
      setDefaultValue(newValue);
      alert(`Saved value: ${newValue}`);
    }}
  />
);
```

#### Disable Reset on Blur (Losing Focus)

By default the input value is reset to the initial value when the input loses focus. However this can be changed with the `resetOnBlur` prop

```jsx
const [value, setValue] = React.useState('Herz-UI');
const [defaultValue, setDefaultValue] = React.useState('Herz-UI');

return (
  <EditableText
    value={value}
    defaultValue={defaultValue}
    onChange={(newValue) => setValue(newValue)}
    resetOnBlur={false}
    onSave={(newValue) => {
      setDefaultValue(newValue);
      alert(`Saved value: ${newValue}`);
    }}
  />
);
```
