InputGroup is used to group multiple `Input`s and `Select`s, or `TextField`s.

### Grouped Inputs/Selects

```js
import Input from '../Input/Input';
import Select from '../Select/Select';
<InputGroup>
  <Input placeholder="With a placeholder" />
  <Input />
  <Select>
    <Select.Option value={1}>First</Select.Option>
    <Select.Option value={2}>Second</Select.Option>
  </Select>
</InputGroup>;
```

### Grouped TextField

```js
import TextField from '../TextField/TextField';
<InputGroup>
  <TextField helperText="First Input" />
  <TextField
    helperText="Select"
    select
    selectProps={{
      value: 1,
    }}
  >
    <Select.Option value={1}>First</Select.Option>
    <Select.Option value={2}>Second</Select.Option>
  </TextField>
  <TextField helperText="Last Input" />
</InputGroup>;
```
