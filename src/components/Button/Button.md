# Button

### primary:

```js
<Button mr={2}>Beep</Button>
```

### secondary:

```js
<Button variant="secondary">Boop</Button>
```

## variants

Button variants can be defined in the `theme.buttons` object. The Button component uses `theme.buttons.primary` as its default variant style.

```markup
// example theme variants
{
  buttons: {
    primary: {
      color: 'background',
      bg: 'primary',
      '&:hover': {
        bg: 'text',
      }
    },
    secondary: {
      color: 'background',
      bg: 'secondary',
    },
  },
}

```
