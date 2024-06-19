Default CheckableTag example:

```js
const [checked, setChecked] = React.useState(false);

<CheckableTag
  checked={checked}
  onChange={() => setChecked((previousState) => !previousState)}
/>;
```

Labeled CheckableTag example:

```js
const [checked, setChecked] = React.useState(false);

<CheckableTag
  label="Check me"
  checked={checked}
  onChange={() => setChecked((previousState) => !previousState)}
/>;
```

Disabled CheckableTag state example:

```js
<CheckableTag label="Uncheckable" disabled={true} />;
```
