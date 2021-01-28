#### Default:

```js
<TextField placeholder="Test input placeholder" />
```

#### Controlled:

```js
const [value, setValue] = React.useState('controlled input value')

return <TextField value={value} onChange={(event) => setValue(event.target.value)} />
```

#### With Label:

```js
<TextField label="Email"  />
```

#### Label and Helper text:

```js
<TextField label="Doc. type" helperText="SSN, Passport, Driver’s license..." id="docType" required />
```

#### With unit:

```js
<TextField placeholder="Size of ruler" unit="in" />
```
