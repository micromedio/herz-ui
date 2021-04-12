The EditableText component is used when you want to display values of an entity in a way that it looks like normal text, while allowing the user to click on it to edit as an input and save/discard changes.

### Example
```jsx
<EditableText
  value="Herz-UI"
/>
```

### States

#### Loading
```jsx
<EditableText
  value="Herz-UI"
  status="loading"
/>
```

#### Error
```jsx
<EditableText
  value="Herz-UI"
  status="error"
  helperText="Something went wrong"
/>
```

#### Success
```jsx
<EditableText
  value="Herz-UI"
  status="success"
  helperText="Changes have been saved"
/>
```

### Saving Changes

#### Default
The component calls the `onSave` prop when the changes are supposed to be applied.

```jsx
const [value, setValue] = React.useState("Herz-UI")

return (
  <EditableText
    value={value}
    onSave={(newValue) => {
      setValue(newValue)
      alert(`Saved value: ${newValue}`)
    }}
  />
);
```

#### Save on Blur (Losing Focus)
By default the `onSave` callback is only called when the save (check) button is clicked. However this can be changed with the `saveOnBlur` prop


```jsx
const [value, setValue] = React.useState("Herz-UI")

return (
  <EditableText
    value={value}
    saveOnBlur
    onSave={(newValue) => {
      setValue(newValue)
      alert(`Saved value: ${newValue}`)
    }}
  />
);
```

#### Reset on Blur (Losing Focus)
By default the input value is reset to the initial value when the input loses focus. However this can be changed with the `resetOnBlur` prop

```jsx
const [value, setValue] = React.useState("Herz-UI")

return (
  <EditableText
    value={value}
    resetOnBlur={false}
    onSave={(newValue) => {
      setValue(newValue)
      alert(`Saved value: ${newValue}`)
    }}
  />
);
```
