#### Remember to activate something like Chrome Device Mode before using the examples because the component needs touch emulation

#### Default:

```js
import Button from '../Button/Button'
const [isOpen, setIsOpen] = React.useState(false)
;(
<div style={{ height: `100%`, width: 300 }}>
  <Button
    onClick={() => {
      setIsOpen(!isOpen)
    }}
  >
    Toggle Open
  </Button>
  <MobileModal open={isOpen}>
    <Button
      iconName="IconChevronLeft"
      onClick={() => {
        setIsOpen(!isOpen)
      }}
    >
      Back
    </Button>
  </MobileModal>
</div>
)
```

#### With spacing:

```js
import Button from '../Button/Button'
const [isOpen, setIsOpen] = React.useState(false)
;(
<div style={{ height: `100%`, width: 300 }}>
  <Button
    onClick={() => {
      setIsOpen(!isOpen)
    }}
  >
    Toggle Open
  </Button>
  <MobileModal open={isOpen} topSpacing={360}>
    <Button
      iconName="IconChevronLeft"
      onClick={() => {
        setIsOpen(!isOpen)
      }}
    >
      Back
    </Button>
  </MobileModal>
</div>
)
```

#### With Spacing and Dismissible:

##### To turn a controlled modal into a dismissible one, you must inform the onDismiss property, the dismissible prop is not required in that case and will be ignored

```js
import Button from '../Button/Button'
const [isOpen, setIsOpen] = React.useState(false)
;(
<div style={{ height: `100%`, width: 300 }}>
  <Button
    onClick={() => {
      setIsOpen(!isOpen)
    }}
  >
    Toggle Open
  </Button>
  <MobileModal
    onDismiss={() => {
      setIsOpen(false)
    }}
    open={isOpen}
    topSpacing={360}
  >
    <Button
      iconName="IconChevronLeft"
      onClick={() => {
        setIsOpen(!isOpen)
      }}
    >
      Back
    </Button>
  </MobileModal>
</div>
)
```
#### All next draggable example needs to hide the modal to avoid displaying through all this page, so toggle the display on to test the component

#### Draggable:

```js
import Button from '../Button/Button'
const [displayMobileModal, setDisplayMobileModal] = React.useState(false)
;(
<div style={{ height: `100%`, width: 300 }}>
  <Button
    onClick={() => {
      setDisplayMobileModal(!displayMobileModal)
    }}
  >
    Toggle Display
  </Button>
  {displayMobileModal && <MobileModal
    onClose={() => {
      setDisplayMobileModal(false)
    }}
    draggable
    overflowHeight={64}
  >
    <div
      style={{
        position: `relative`,
        width: 40,
        height: 0,
        left: `calc(50% - 20px)`,
        top: `0`,
        border: `4px solid #E8E8E9`,
      }}
    />
  </MobileModal>}
</div>
)
```

#### Draggable Without Overflow:

```js
import Button from '../Button/Button'
const [displayMobileModal, setDisplayMobileModal] = React.useState(false)
;(
<div style={{ height: `100%`, width: 300 }}>
  <Button
    onClick={() => {
      setDisplayMobileModal(!displayMobileModal)
    }}
  >
    Toggle Display
  </Button>
  {displayMobileModal && <MobileModal
    onClose={() => {
      setDisplayMobileModal(false)
    }}
    draggable
  >
    <div
      style={{
        position: `relative`,
        width: 40,
        height: 0,
        left: `calc(50% - 20px)`,
        top: `0`,
        border: `4px solid #E8E8E9`,
      }}
    />
  </MobileModal>}
</div>
)
```

#### Draggable With Spacing:

```js
import Button from '../Button/Button'
const [displayMobileModal, setDisplayMobileModal] = React.useState(false)
;(
<div style={{ height: `100%`, width: 300 }}>
  <Button
    onClick={() => {
      setDisplayMobileModal(!displayMobileModal)
    }}
  >
    Toggle Display
  </Button>
  {displayMobileModal && <MobileModal
    onClose={() => {
      setDisplayMobileModal(false)
    }}
    draggable
    overflowHeight={64}
    topSpacing={128}
  >
    <div
      style={{
        position: `relative`,
        width: 40,
        height: 0,
        left: `calc(50% - 20px)`,
        top: `0`,
        border: `4px solid #E8E8E9`,
      }}
    />
  </MobileModal>}
</div>
)
```

#### Draggable With Spacing And Dismissible:

```js
import Button from '../Button/Button'
const [displayMobileModal, setDisplayMobileModal] = React.useState(false)
;(
<div style={{ height: `100%`, width: 300 }}>
  <Button
    onClick={() => {
      setDisplayMobileModal(!displayMobileModal)
    }}
  >
    Toggle Display
  </Button>
  {displayMobileModal && <MobileModal
    onClose={() => {
      setDisplayMobileModal(false)
    }}
    dismissible
    draggable
    overflowHeight={64}
    topSpacing={128}
  >
    <div
      style={{
        position: `relative`,
        width: 40,
        height: 0,
        left: `calc(50% - 20px)`,
        top: `0`,
        border: `4px solid #E8E8E9`,
      }}
    />
  </MobileModal>}
</div>
)
```
