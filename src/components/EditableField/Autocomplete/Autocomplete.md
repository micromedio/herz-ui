The EditableField.Autocomplete is used when the values in the field are huge and must be filtered. It has the same API as the `Autocomplete` component, but with a few extra props to handle EditableField behaviour.

### Single Select

```jsx
import EditableField from '../EditableField';
import Highlight from '../../Highlight/Highlight';
const mockedOptions = [
  { value: 1, label: 'Neptunium', symbol: 'Np', A: 237, Z: 93 },
  { value: 2, label: 'Plutonium', symbol: 'Pu', A: 244, Z: 94 },
  { value: 3, label: 'Americium Darmstad', symbol: 'Am', A: 243, Z: 95 },
  { value: 4, label: 'Curium', symbol: 'Cm', A: 247, Z: 96 },
  { value: 5, label: 'Berkelium Flerovios', symbol: 'Bk', A: 247, Z: 97 },
  { value: 6, label: 'Californium Copernicus', symbol: 'Cf', A: 251, Z: 98 },
  { value: 7, label: 'Einsteinium', symbol: 'Es', A: 252, Z: 99 },
  { value: 8, label: 'Fermium', symbol: 'Fm', A: 257, Z: 100 },
  { value: 9, label: 'Mendelevium', symbol: 'Md', A: 258, Z: 101 },
  { value: 10, label: 'Nobelium', symbol: 'No', A: 259, Z: 102 },
];
const [items, setItems] = React.useState(mockedOptions);
const [value, setValue] = React.useState(mockedOptions[0]);
const [defaultValue, setDefaultValue] = React.useState(mockedOptions[0]);

<EditableField.Autocomplete
  buttons={[
    {
      color: 'secondary',
      children: 'More info',
      onClick: () => {
        alert('Clicked on more info!');
      },
      variant: 'plain',
    },
    {
      color: 'secondary',
      children: 'Clear',
      onClick: () => {
        setValue(null);
      },
      variant: 'plain',
    },
  ]}
  defaultSelectedOption={defaultValue}
  onInputValueChange={({ inputValue }) => {
    setItems(
      mockedOptions.filter((option) =>
        inputValue
          ? option.label
              .toLocaleLowerCase()
              .startsWith(inputValue.toLocaleLowerCase())
          : true
      )
    );
  }}
  onSave={(newValue) => {
    setDefaultValue(newValue);
  }}
  onSelectedItemChange={(options) => {
    setValue(options);
  }}
  options={items.slice(0, 5)}
  optionToString={(option) => (option ? option.label : '')}
  placeholder="Search by organization's name or handle"
  renderOption={({ defaultStyles, option }) => (
    <div
      style={{
        ...defaultStyles,
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor:
          defaultStyles.backgroundColor && 'rgba(0,130,252,0.05)',
        display: 'flex',
        padding: 8,
      }}
    >
      {option.label}
    </div>
  )}
  selectedOption={value}
  totalCount={items.length}
/>;
```

### Multiple Select

```jsx
import EditableField from '../EditableField';
import Highlight from '../../Highlight/Highlight';
const mockedOptions = [
  { value: 1, label: 'Neptunium', symbol: 'Np', A: 237, Z: 93 },
  { value: 2, label: 'Plutonium', symbol: 'Pu', A: 244, Z: 94 },
  { value: 3, label: 'Americium Darmstad', symbol: 'Am', A: 243, Z: 95 },
  { value: 4, label: 'Curium', symbol: 'Cm', A: 247, Z: 96 },
  { value: 5, label: 'Berkelium Flerovios', symbol: 'Bk', A: 247, Z: 97 },
  { value: 6, label: 'Californium Copernicus', symbol: 'Cf', A: 251, Z: 98 },
  { value: 7, label: 'Einsteinium', symbol: 'Es', A: 252, Z: 99 },
  { value: 8, label: 'Fermium', symbol: 'Fm', A: 257, Z: 100 },
  { value: 9, label: 'Mendelevium', symbol: 'Md', A: 258, Z: 101 },
  { value: 10, label: 'Nobelium', symbol: 'No', A: 259, Z: 102 },
];
const [items, setItems] = React.useState(mockedOptions);
const [value, setValue] = React.useState([]);
const [defaultValue, setDefaultValue] = React.useState([]);

<EditableField.Autocomplete
  defaultSelectedOption={defaultValue}
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
    );
  }}
  onRemove={(option) => {
    setValue(value.filter((selected) => selected.value !== option.value));
  }}
  onSave={(newValue) => {
    setDefaultValue(newValue);
  }}
  onSelectedItemsChange={(options) => {
    setValue(options);
  }}
  options={items.slice(0, 5)}
  placeholder="Search by organization's name or handle"
  renderOption={({ defaultStyles, option, inputValue }) => (
    <div
      style={{
        ...defaultStyles,
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor:
          defaultStyles.backgroundColor && 'rgba(0,130,252,0.05)',
        display: 'flex',
        padding: 8,
      }}
    >
      <Highlight search={inputValue} text={option.label} />
    </div>
  )}
  selectedOption={value}
  totalCount={items.length}
/>;
```

### Multiple Input With Tags

```jsx
import EditableField from '../EditableField';
import Highlight from '../../Highlight/Highlight';
const mockedOptions = [];
const [items, setItems] = React.useState(mockedOptions);
const [value, setValue] = React.useState([]);
const [defaultValue, setDefaultValue] = React.useState([]);

<EditableField.Autocomplete
  defaultSelectedOption={defaultValue}
  getOptionLabel={(option) => option.label}
  multiSelect
  inputTag
  required
  validationRegex={
    new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, 'gm')
  }
  onKeyEnter={(inputValue) => {
    setValue([...value, { label: inputValue, value: inputValue }]);
  }}
  onInputValueChange={({ inputValue }) => {}}
  onRemove={(option) => {
    setValue(value.filter((selected) => selected.value !== option.value));
  }}
  onSave={(newValue) => {
    console.log(newValue, 'new');
    setDefaultValue(newValue);
  }}
  onSelectedItemsChange={(options) => {
    setValue(options);
  }}
  options={items.slice(0, 5)}
  placeholder="Search by organization's name or handle"
  selectedOption={value}
  totalCount={items.length}
/>;
```
