#### Default:

```js
<LinearProgress />
```

#### Primary:

```js
<LinearProgress color="primary" />
```

#### Success:

```js
<LinearProgress color="success" />
```

#### Warning:

```js
<LinearProgress color="warning" />
```

#### With Custom Height:

```js
<LinearProgress height={8} />
```

#### With Progress:

```js
<div
  style={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: 2,
  }}
>
  25% - Progress = 0.25
  <LinearProgress {...props} progress={0.25} />
  50% - Progress = 0.5
  <LinearProgress {...props} progress={0.5} />
  75% - Progress = 0.75
  <LinearProgress {...props} progress={0.75} />
  100% - Progress = 1
  <LinearProgress {...props} progress={1} />
</div>
```
