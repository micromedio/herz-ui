#### filled primary:

```js
const onClick = () => {alert("clicked")};
<Button variant="filled" color="primary" onClick={onClick}>
  Tatooine
</Button>
```

#### filled primary disabled:

```js
const children = "Mustafar";
<Button variant="filled" color="primary" disabled>
  {children}
</Button>
```


#### filled gray:

```js
const onClick = () => {alert("clicked")};
const children = "Tatooine";
<Button variant="filled" color="muted" onClick={onClick}>
  {children}
</Button>
```

#### filled gray disabled:

```js
const children = "Tatooine";
<Button variant="filled" color="muted" disabled>
  {children}
</Button>
```

#### plain:

```js
const onClick = () => {alert("clicked")};
const children = "Alderaan";
<Button variant="plain" color="secondary" onClick={onClick}>
  {children}
</Button>
```

#### plain disabled:

```js
<Button variant="plain" color="secondary" disabled>Mustafar</Button>
```
