### Example

```jsx
import Button from "../Button/Button"
const [isOpen, setModalOpen] = React.useState(false)

;<>
  <>
    <Button onClick={() => setModalOpen(!isOpen)}>Toggle Open</Button>
    <DesktopModal {...props} isVisible={isOpen}>
      <Button onClick={() => setModalOpen(false)}>Close modal</Button>
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
    </DesktopModal>
  </>
</>
```
