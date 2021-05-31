In some rare situations you may need to have multiple inputs behave as a group, only saving/resetting together. For this you can use the `EditableField.Group` component.

### Example
```jsx
import EditableField from '../EditableField'
const [value, setValue] = React.useState("Herz-UI")
const [defaultValue, setDefaultValue] = React.useState("Herz-UI")

const [firstValue, setFirstValue] = React.useState("Grouped 1")
const [secondValue, setSecondValue] = React.useState("Grouped 2")

const [firstDefaultValue, setFirstDefaultValue] = React.useState("Grouped 1")
const [secondDefaultValue, setSecondDefaultValue] = React.useState("Grouped 2")

;(
  <div style={{ display: 'grid', gap: 6 }}>
    <EditableField.Text
      value={value}
      defaultValue={defaultValue}
      onChange={(event) => setValue(event.target.value)}
      onSave={(newValue) => setDefaultValue(newValue)}
    />
    <EditableField.Group
      onSave={(values) => {
        setFirstDefaultValue(values.first)
        setSecondDefaultValue(values.second)
      }}
    >
      <EditableField.Text
        name="first"
        value={firstValue}
        defaultValue={firstDefaultValue}
        onChange={(event) => setFirstValue(event.target.value)}
      />
      <EditableField.Text
        name="second"
        value={secondValue}
        defaultValue={secondDefaultValue}
        onChange={(event) => setSecondValue(event.target.value)}
        controlsGroup
      />
    </EditableField.Group>
  </div>
);
```

### Example With Select
```jsx
import EditableField from '../EditableField'
const [value, setValue] = React.useState("Herz-UI")
const [defaultValue, setDefaultValue] = React.useState("Herz-UI")

const [firstValue, setFirstValue] = React.useState("Grouped 1")
const [secondValue, setSecondValue] = React.useState(1)

const [firstDefaultValue, setFirstDefaultValue] = React.useState("Grouped 1")
const [secondDefaultValue, setSecondDefaultValue] = React.useState(1)

;(
  <div style={{ display: 'grid', gap: 6 }}>
    <EditableField.Text
      value={value}
      defaultValue={defaultValue}
      onChange={(event) => setValue(event.target.value)}
      onSave={(newValue) => setDefaultValue(newValue)}
    />
    <EditableField.Group
      onSave={(values) => {
        setFirstDefaultValue(values.first)
        setSecondDefaultValue(values.second)
      }}
    >
      <EditableField.Text
        name="first"
        value={firstValue}
        defaultValue={firstDefaultValue}
        onChange={(event) => setFirstValue(event.target.value)}
      />
      <EditableField.Select
        name="second"
        value={secondValue}
        defaultValue={secondDefaultValue}
        onChange={setSecondValue}
        onSave={setSecondDefaultValue}
        controlsGroup
      >
        <EditableField.Select.Option value={1}>Neptunium</EditableField.Select.Option>
        <EditableField.Select.Option value={2}>Plutonium</EditableField.Select.Option>
        <EditableField.Select.Option value={3}>Americium</EditableField.Select.Option>
        <EditableField.Select.Option value={4}>Curium</EditableField.Select.Option>
      </EditableField.Select>
    </EditableField.Group>
  </div>
);
```

### Usage
When an EditableField component is wrapped in an EditableField.Group, you must pass a `name` to each field and one of them must have `controlsGroup` set to true, to signify which one should handle showing the confirm/cancel buttons.

The `saveOnBlur`, `resetOnBlur` and `status` props are also ignored in the children fields, they are controlled by the EditableField.Group component, which receives the same props.
