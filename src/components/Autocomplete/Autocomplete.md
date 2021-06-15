Autocomplete example:

### Single Select

#### Default

```js
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
const [value, setValue] = React.useState(null)
;(
<Autocomplete
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
  options={items.slice(0, 5)}
  optionToString={(option) => (option ? option.label : "")}
  placeholder="Search by organization's name or handle"
  renderOption={({ defaultStyles, option }) => (
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
      {option.label}
    </div>
  )}
  onSelectedItemChange={({ selectedItem: selectedOption }) => {
    setValue(selectedOption)
  }}
  selectedOption={value}
  totalCount={items.length}
/>
)
```

#### With Label And Helper Text

```js
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
const [value, setValue] = React.useState(null)
;(
<Autocomplete
  helperText="This is a helper text"
  label="Label"
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
  optionalText="optional"
  options={items.slice(0, 5)}
  optionToString={(option) => (option ? option.label : "")}
  placeholder="Search by organization's name or handle"
  renderOption={({ highlightedIndex, defaultStyles, option }) => (
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
      {option.label}
    </div>
  )}
  onSelectedItemChange={({ selectedItem: selectedOption }) => {
    setValue(selectedOption)
  }}
  selectedOption={value}
  totalCount={items.length}
/>
)
```

#### With Action Buttons

```js
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
const [value, setValue] = React.useState(mockedOptions[0])
;(
<Autocomplete
  buttons={
    [
      {
        color: "secondary",
        children: "More info",
        onClick: () => {
          alert("Clicked on more info!")
        },
        variant: "plain",
      },
      {
        color: "secondary",
        children: "Clear",
        onClick: () => {
          setValue(null)
        },
        variant: "plain",
      },
    ]
  }
  helperText="This is a helper text"
  label="Label"
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
  optionalText="optional"
  options={items.slice(0, 5)}
  optionToString={(option) => (option ? option.label : "")}
  placeholder="Search by organization's name or handle"
  renderOption={({ highlightedIndex, defaultStyles, option }) => (
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
      {option.label}
    </div>
  )}
  onSelectedItemChange={({ selectedItem: selectedOption }) => {
    setValue(selectedOption)
  }}
  selectedOption={value}
  totalCount={items.length}
/>
)
```
#### With Custom Selected Option Render

```js
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
const [value, setValue] = React.useState(mockedOptions[5])
;(
<Autocomplete
  buttons={
    [
      {
        color: "secondary",
        children: "More info",
        onClick: () => {
          alert("Clicked on more info!")
        },
        variant: "plain",
      },
      {
        color: "secondary",
        children: "Clear",
        onClick: () => {
          setValue(null)
        },
        variant: "plain",
      },
    ]
  }
  helperText="This is a helper text"
  label="Label"
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
  optionalText="optional"
  options={items.slice(0, 5)}
  optionToString={(option) => (option ? option.label : "")}
  placeholder="Search by organization's name or handle"
  renderOption={({ highlightedIndex, defaultStyles, option }) => (
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
      {option.label}
    </div>
  )}
  renderSelectedItem={(selectedOption) => {
    return (
      <span>
        {selectedOption.label}{" "}
        <strong>
          <sup style={{ position: "relative", left: 12, top: -5 }}>
            {selectedOption.A}
          </sup>
          <sub
            style={{
              position: "relative",
              top: 5,
            }}
          >
            {selectedOption.Z}
          </sub>
          {selectedOption.symbol}
        </strong>
      </span>
    )
  }}
  onSelectedItemChange={({ selectedItem: selectedOption }) => {
    setValue(selectedOption)
  }}
  selectedOption={value}
  totalCount={items.length}
/>
)
```
#### With Highlight

```js
import Highlight from "../Highlight/Highlight"
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
const [value, setValue] = React.useState(null)
;(
<Autocomplete
  buttons={
    [
      {
        color: "secondary",
        children: "More info",
        onClick: () => {
          alert("Clicked on more info!")
        },
        variant: "plain",
      },
      {
        color: "secondary",
        children: "Clear",
        onClick: () => {
          setValue(null)
        },
        variant: "plain",
      },
    ]
  }
  helperText="This is a helper text"
  label="Label"
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
  optionalText="optional"
  options={items.slice(0, 5)}
  optionToString={(option) => (option ? option.label : "")}
  placeholder="Search by organization's name or handle"
  renderOption={({ highlightedIndex, defaultStyles, option, inputValue }) => (
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
  renderSelectedItem={(selectedOption) => {
    return (
      <span>
        {selectedOption.label}{" "}
        <strong>
          <sup style={{ position: "relative", left: 12, top: -5 }}>
            {selectedOption.A}
          </sup>
          <sub
            style={{
              position: "relative",
              top: 5,
            }}
          >
            {selectedOption.Z}
          </sub>
          {selectedOption.symbol}
        </strong>
      </span>
    )
  }}
  onSelectedItemChange={({ selectedItem: selectedOption }) => {
    setValue(selectedOption)
  }}
  selectedOption={value}
  totalCount={items.length}
/>
)
```

### Multi Select

#### With Tags

```js
import Highlight from "../Highlight/Highlight"
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
const [value, setValue] = React.useState([])
;(
<Autocomplete
  getOptionLabel={(option) => option.label}
  multiSelect
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
  onSelectedItemsChange={(selectedOptions) => {
    setValue(selectedOptions)
  }}
  selectedOption={value}
  totalCount={items.length}
/>
)
```

#### With Remove

```js
import Highlight from "../Highlight/Highlight"
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
const [value, setValue] = React.useState([])
;(
<Autocomplete
  getOptionLabel={(option) => option.label}
  multiSelect
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
    setValue(value.filter((selected) => selected.value !== option.value))
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
  onSelectedItemsChange={(selectedOptions) => {
    setValue(selectedOptions)
  }}
  selectedOption={value}
  totalCount={items.length}
/>
)
```

#### With Custom Render

```js
import Highlight from "../Highlight/Highlight"
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
const [value, setValue] = React.useState([])
;(
<Autocomplete
  getOptionLabel={(option) => option.label}
  multiSelect
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
    setValue(value.filter((selected) => selected.value !== option.value))
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
  renderSelectedItems={(options) => {
    return options.map((option) => (
      <span key={option.value}>
        {option.label}{" "}
        <strong>
          <sup sx={{ position: "relative", left: 3, top: "-5px" }}>
            {option.A}
          </sup>
          <sub
            sx={{
              position: "relative",
              top: "5px",
            }}
          >
            {option.Z}
          </sub>
          {option.symbol}
        </strong>
      </span>
    ))
  }}
  onSelectedItemsChange={(selectedOptions) => {
    setValue(selectedOptions)
  }}
  selectedOption={value}
  totalCount={items.length}
/>
)
```

#### Keep Search After Select

```js
import Highlight from "../Highlight/Highlight"
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
const [value, setValue] = React.useState([])
;(
<Autocomplete
  getOptionLabel={(option) => option.label}
  keepSearchAfterSelect
  multiSelect
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
    setValue(value.filter((selected) => selected.value !== option.value))
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
  onSelectedItemsChange={(selectedOptions) => {
    setValue(selectedOptions)
  }}
  selectedOption={value}
  totalCount={items.length}
/>
)
```
