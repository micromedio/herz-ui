#### filled primary:

```js
const onClick = () => {
  alert('clicked');
};
<Button variant="filled" color="primary" onClick={onClick} iconName="IconPlus">
  Tatooine
</Button>;
```

#### filled primary small:

```js
const onClick = () => {
  alert('clicked');
};
<Button
  variant="filled"
  color="primary"
  onClick={onClick}
  iconName="IconPlus"
  size="small"
>
  Tatooine
</Button>;
```

#### filled primary with ReactNode children (please note the use is focused in custom SVG's or custom icons):

```js
const children = (
  <>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="21"
      viewBox="0 0 21 21"
    >
      <title>MS-SymbolLockup</title>
      <rect x="1" y="1" width="9" height="9" fill="#f25022" />
      <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
      <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
      <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
    </svg>
  </>
);
<Button variant="filled" color="primary">
  {children}
</Button>;
```

#### filled primary disabled:

```js
const children = 'Tatooine';
<Button variant="filled" color="primary" disabled>
  {children}
</Button>;
```

#### filled gray:

```js
const onClick = () => {
  alert('clicked');
};
const children = 'Tatooine';
<Button variant="filled" color="text" onClick={onClick}>
  {children}
</Button>;
```

#### filled gray small:

```js
const onClick = () => {
  alert('clicked');
};
const children = 'Tatooine';
<Button variant="filled" color="text" onClick={onClick} size="small">
  {children}
</Button>;
```

#### filled gray disabled:

```js
const children = 'Tatooine';
<Button variant="filled" color="text" disabled>
  {children}
</Button>;
```

#### filledLight:

```js
const onClick = () => {
  alert('clicked');
};
const children = 'Alderaan';
<Button variant="filledLight" color="secondary" onClick={onClick}>
  {children}
</Button>;
```

#### plain:

```js
const onClick = () => {
  alert('clicked');
};
const children = 'Alderaan';
<Button variant="plain" color="secondary" onClick={onClick}>
  {children}
</Button>;
```

#### plain disabled:

```js
<Button variant="plain" color="secondary" disabled>
  Mustafar
</Button>
```

#### icon only:

```js
<Button variant="plain" color="secondary" iconName="IconPlus" />
```
