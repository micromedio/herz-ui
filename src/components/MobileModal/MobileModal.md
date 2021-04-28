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
##### The dismissible prop must be a function when the open state is controlled

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
    dismissible={() => {
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
##### The dismissible prop must be a boolean when the open state is uncontrolled

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
