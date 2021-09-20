### Example

```jsx
import Button from "../Button/Button"
const [isOpen, setModalOpen] = React.useState(false)

;<>
  <>
    <Button onClick={() => setModalOpen(!isOpen)}>Toggle Open</Button>
    <DesktopModal {...props} isVisible={isOpen}>
      <div>Modal info 1</div>
      <div>Modal info</div>
      <div>Modal info</div>
      <div>Modal info</div>
      <div>Modal info</div>
      <div>Modal info</div>
      <div>Modal info</div>
      <div>Modal info</div>
      <div>Modal info</div>
      <div>Modal info</div>
      <div>Modal info</div>
      <div>Modal info</div>
      <div>Modal info</div>
      <div>Modal info</div>
      <div>Modal info</div>
      <div>Modal info</div>
      <div>Modal info</div>
      <div>Modal info</div>
      <div>Modal info</div>
      <div>Modal info</div>
      <div>Modal info</div>
      <div>Modal info</div>
      <div>Modal info</div>
      <div>Modal info</div>
      <div>Modal info</div>
      <div>Modal info</div>
      <div>Modal info</div>
      <div>Modal info</div>
      <div>Modal info</div>
      <div>Modal info</div>
      <div>Modal info</div>
      <div>Modal info</div>
      <div>Modal info</div>
      <div>Modal info</div>
      <div>Modal info</div>
      <div>Modal info</div>
      <div>Modal info</div>
      <div>Modal info</div>
      <div>Modal info</div>
      <div>Modal info</div>
      <div>Modal info</div>
      <div>Modal info</div>
      <div>Modal info</div>
      <div>Modal info</div>
      <div>Modal info</div>
      <Button onClick={() => setModalOpen(false)}>Close modal</Button>
    </DesktopModal>
  </>
</>
```
