The Accordion component is a list of collapsible items where only one can be open at a time.

### Example
```jsx
<Accordion>
  <Accordion.Item title="General Settings">General Settings Content</Accordion.Item>
  <Accordion.Item title="Users">User content</Accordion.Item>
</Accordion>
```

### Initially open
```jsx
<Accordion initialOpenIndex={1}>
  <Accordion.Item title="General Settings">General Settings Content</Accordion.Item>
  <Accordion.Item title="Users">User content</Accordion.Item>
</Accordion>
```
