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

### Example With Text Area
```jsx
import EditableField from '../EditableField'
const [value, setValue] = React.useState("Herz-UI")
const [defaultValue, setDefaultValue] = React.useState("Herz-UI")

const [firstValue, setFirstValue] = React.useState("Grouped 1")
const [secondValue, setSecondValue] = React.useState("Grouped\n2")

const [firstDefaultValue, setFirstDefaultValue] = React.useState("Grouped 1")
const [secondDefaultValue, setSecondDefaultValue] = React.useState("Grouped\n2")

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
        multiline
        rows={2}
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

### Example With Autocomplete

##### <span style="color: red;">Attention:</span> when an <span style="color: red;">`EditableField.Group`</span> has an <span style="color: red;">`EditableField.Autocomplete`</span> inside of it, the <span style="color: red;">`saveOnBlur`</span> and <span style="color: red;">`resetOnBlur`</span> props are ignored, and the group behaves as is both props are <span style="color: red;">`false`</span> (so no save or reset will happen on blur)

```jsx
import EditableField from '../EditableField'
import Highlight from "../../Highlight/Highlight"
const mockedOptions = [
  { value: 1, label: "Neptunium", symbol: "Np", A: 237, Z: 93 },
  { value: 2, label: "Plutonium", symbol: "Pu", A: 244, Z: 94 },
  { value: 3, label: "Americium Darmstad", symbol: "Am", A: 243, Z: 95 },
  { value: 4, label: "Curium", symbol: "Cm", A: 247, Z: 96 },
  { value: 5, label: "Berkelium Flerovios", symbol: "Bk", A: 247, Z: 97 },
  { value: 6, label: "Californium Copernicus", symbol: "Cf", A: 251, Z: 98 },
  { value: 7, label: "Einsteinium", symbol: "Es", A: 252, Z: 99 },
  { value: 8, label: "Fermium", symbol: "Fm", A: 257, Z: 100 },
  { value: 9, label: "Mendelevium", symbol: "Md", A: 258, Z: 101 },
  { value: 10, label: "Nobelium", symbol: "No", A: 259, Z: 102 },
]
const [items, setItems] = React.useState(mockedOptions)
const [firstValue, setFirstValue] = React.useState("First")
const [secondValue, setSecondValue] = React.useState([])
const [value, setValue] = React.useState("Herz-UI")

const [defaultValue, setDefaultValue] = React.useState("Herz-UI")
const [firstDefaultValue, setFirstDefaultValue] = React.useState("First")
const [secondDefaultValue, setSecondDefaultValue] = React.useState([])
;(
  <div style={{ display: 'grid', gap: 6 }}>
    <EditableField.Text
      value={value}
      defaultValue={defaultValue}
      onChange={(event) => setValue(event.target.value)}
      onSave={(newValue) => setDefaultValue(newValue)}
    />
    <EditableField.Group
      {...props}
      onSave={(values) => {
        setFirstDefaultValue(values.first)
        setSecondDefaultValue(values.autocomplete)
      }}
    >
      <div
        style={{
          display: "grid",
          gap: 6,
        }}
      >
        <EditableField.Text
          name="first"
          value={firstValue}
          defaultValue={firstDefaultValue}
          onChange={(event) => setFirstValue(event.target.value)}
        />
        <EditableField.Autocomplete
          controlsGroup
          defaultSelectedOption={secondDefaultValue}
          getOptionLabel={(option) => option.label}
          multiSelect
          name="autocomplete"
          onInputValueChange={({ inputValue }) => {
            setItems(
              mockedOptions.filter((option) =>
                inputValue
                  ? option.label
                      .toLocaleLowerCase()
                      .startsWith(inputValue.toLocaleLowerCase())
                  : true
              )
            )
          }}
          onRemove={(option) => {
            setSecondValue(
              secondValue.filter((selected) => selected.value !== option.value)
            )
          }}
          onSelectedItemsChange={(options) => {
            setSecondValue(options)
          }}
          options={items.slice(0, 5)}
          placeholder="Search by organization's name or handle"
          renderOption={({ defaultStyles, option, inputValue }) => (
            <div
              style={{
                ...defaultStyles,
                alignContent: "center",
                alignItems: "center",
                backgroundColor: defaultStyles.backgroundColor && "rgba(0,130,252,0.05)",
                display: "flex",
                padding: 8,
              }}
            >
              <Highlight search={inputValue} text={option.label} />
            </div>
          )}
          selectedOption={secondValue}
          totalCount={items.length}
        />
      </div>
    </EditableField.Group>
  </div>
);
```

### Usage
When an EditableField component is wrapped in an EditableField.Group, you must pass a `name` to each field and one of them must have `controlsGroup` set to true, to signify which one should handle showing the confirm/cancel buttons.

The `saveOnBlur`, `resetOnBlur` and `status` props are also ignored in the children fields, they are controlled by the EditableField.Group component, which receives the same props.
