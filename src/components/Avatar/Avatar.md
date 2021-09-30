Avatar

### Usage

This component aims to render user images

#### Default

```jsx
<Avatar alt="Albert Einstein" src="images/albert_einstein.webp" />
```

#### Without Source Or Children

```jsx
<Avatar alt="Albert Einstein" />
```

#### Without Source And With Children

```jsx
<Avatar alt="Albert Einstein">AE</Avatar>
```

#### Diferent Sizes

```jsx
<div style={{ display: "flex", gap: 16 }}>
  <Avatar
    alt="Albert Einstein"
    size={16}
    src="images/albert_einstein.webp"
  />
  <Avatar alt="Albert Einstein" size={32}>
    AE
  </Avatar>
  <Avatar alt="Albert Einstein" size={64} />
  <Avatar size={128} />
</div>
```
