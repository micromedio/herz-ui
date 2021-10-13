The Skeleton component is to be used when you want to display placeholder content while the content is loading

### Variants

#### Rectangle

This is the basic and default shape, used to render any rectangular content.

```jsx
<Skeleton
  variant="rect"
  width={60}
  height={20}
/>
```

#### Circle

With the `circle` variant, the border radius will be set to 50%.

```jsx
<Skeleton
  variant="circle"
  width={60}
  height={60}
/>
```

#### Text

When the variant is set to `text`, the Skeleton height will infer the height according to the font-size of where it's located.

```jsx
<Skeleton
  variant="text"
  width={80}
/>
```
