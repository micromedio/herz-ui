
Highlight
### Usage

This component is designed to highlight text on search components, for instance, searching on a table and highlighting the searched text.

### Props

##### backgroundColor

- The background color to the Highlight Component: default is highlight

##### text

- The text to be rendered.

##### search

- The text that must match and highlight on the text prop.

#### Simple Example

```jsx
<Highlight search="highlight" text="This is a simple text for highlighting purposes" />
```

#### Color Change

```jsx
<Highlight backgroundColor="primary" search="highlight" text="This is a simple text for highlighting purposes" />
```

#### Double Highlight

```jsx
<Highlight search="highlight" text="This is a simple text for highlighting purposes and see it's possible to highlight twice or more times" />
```

#### Multiple Highlight

```jsx
<Highlight search="lorem" text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum" />
```
