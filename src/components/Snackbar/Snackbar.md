Snackbars are used to display feedback to the user, for example when something is loading, or when a form was successfully submitted or not.

### Snackbar Types:

#### Success
```jsx
<Snackbar
  type="success"
  title="Success!"
/>
```

#### Error
```jsx
<Snackbar
  type="error"
  title="Error!"
/>
```

#### Loading
```jsx
<Snackbar
  type="loading"
  title="Loading..."
/>
```

#### With Body
```jsx
<Snackbar
  type="loading"
  title="Loading..."
  body="Optional Body"
/>
```

#### With Close Button
```jsx
<Snackbar
  type="success"
  title="Success! Now close it"
  onClose={() => alert("closed!")}
/>
```

### useSnackbar hook

The easiest way to use the snackbars is to wrap your app in the SnackbarProvider and use the useSnackbar hook.

#### Example
```js
import Button from '../Button/Button'
import { useSnackbar } from "./hooks/useSnackbar"

const { enqueueSnackbar } = useSnackbar()

;(
  <Button
    variant="plain"
    color="secondary"
    onClick={() => enqueueSnackbar({
      title: "Hello!",
      type: "success",
    })}
  >
    Show Snackbar
  </Button>
)
```
