### Example

```jsx
import Button from "../Button/Button"
const [isOpen, setModalOpen] = React.useState(false)

;<>
  <>
    <Button onClick={() => setModalOpen(!isOpen)}>Toggle Open</Button>
    <DesktopModal {...props} isVisible={isOpen}>
      Modal info
      <Button onClick={() => setModalOpen(false)}>Close modal</Button>
    </DesktopModal>
  </>
</>
```
