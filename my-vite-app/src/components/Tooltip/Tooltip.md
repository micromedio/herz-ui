Used to display information about an element, when hovering over a screen element or component.

Given an element, such as a button, and the Tooltip component will automatically put itself in the right place near the button.

The Tooltip will be positioned properly whenever it "pops out" from the flow of your document. And it will float back to the reference element.

#### default example:

```js
import Button from '../Button/Button'
;(<Tooltip title="this is the actual tooltip">
  <Button>this is the reference element</Button>
</Tooltip>)
```

#### placed on top example:

```js
import Button from '../Button/Button'
;(<Tooltip title="this tooltip is on the top of the reference" placement="top">
  <Button>this is the reference element</Button>
</Tooltip>)
```
