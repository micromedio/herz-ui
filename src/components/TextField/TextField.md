#### Default:

```js
<TextField placeholder="Test input placeholder" />
```

#### Controlled:

```js
const [value, setValue] = React.useState('controlled input value');

return (
  <TextField value={value} onChange={(event) => setValue(event.target.value)} />
);
```

#### With Label:

```js
<TextField label="Email" />
```

#### Label and Helper text:

```js
<TextField
  label="Doc. type"
  helperText="SSN, Passport, Driver’s license..."
  id="docType"
  required
/>
```

#### With unit:

```js
<TextField placeholder="Size of ruler" unit="in" />
```

#### With Icon:

```js
<TextField placeholder="Search" iconName="IconSearch" />
```

#### TextArea:

```js
<TextField multiline />
```

#### Text Area Controlled:

```js
const [value, setValue] = React.useState('Controlled input value\n\n\n');

return (
  <TextField
    multiline
    rows={2}
    value={value}
    onChange={(event) => setValue(event.target.value)}
  />
);
```

#### Text Area With Label:

```js
<TextField multiline rows={2} label="Awesome Text Area" />
```

#### Text Area Label and Helper text:

```js
<TextField
  multiline
  rows={2}
  label="Awesome Text Area"
  helperText="This is an awesome Text Area made to type awesome texts"
  id="awesomeTextArea"
  required
/>
```

#### Text Area With Icon:

```js
<TextField
  multiline
  rows={3}
  placeholder="Type an awesome text"
  iconName="IconAlignJustified"
/>
```
