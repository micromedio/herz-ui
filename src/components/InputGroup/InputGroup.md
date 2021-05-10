InputGroup is used to group multiple `Input`s and `Selector`s, or `TextField`s.

### Grouped Inputs/Selectors
```js
import Input from '../Input/Input'
import Selector from '../Selector/Selector'

;(
  <InputGroup>
    <Input placeholder="With a placeholder" />
    <Input />
    <Selector
      options={[
        {
          label: "First",
          value: 1,
        },
        {
          label: "Second",
          value: 2,
        },
      ]}
    />
  </InputGroup>
)
```

### Grouped TextField
```js
import TextField from '../TextField/TextField'

;(
  <InputGroup>
    <TextField helperText="First Input" />
    <TextField
      helperText="Select"
      select
      selectProps={{
        value: 1,
        options: [
          {
            label: "First",
            value: 1,
          },
          {
            label: "Second",
            value: 2,
          },
        ],
      }}
    />
    <TextField helperText="Last Input" />
  </InputGroup>
)
```
