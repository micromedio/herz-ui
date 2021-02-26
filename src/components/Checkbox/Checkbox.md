Labeled Checkbox example:

```js
const [checked, setChecked] = React.useState(false)

;<Checkbox
  label="Check me"
  checked={checked}
  onChange={() => setChecked((prev) => !prev)}
/>
```

Indeterminate Checkbox state example:

```js
const [checked, setChecked] = React.useState(false)

;<Checkbox
  label={checked ? "I'm checked" : "I'm indeterminated"}
  indeterminate={true}
  checked={checked}
  onChange={() => setChecked((prev) => !prev)}
/>
```

Disabled Checkbox state example:

```js
;<Checkbox label="Uncheckable" disabled={true} />
```
