### Example

```jsx
import Button from "../Button/Button"
const [isOpen, setModalOpen] = React.useState(false)

;<>
  <>
    <Button onClick={() => setModalOpen(!isOpen)}>Toggle Open</Button>
    <DesktopModal {...props} isVisible={isOpen}>
      <div sx={{ display: "grid", gap: 6, p: 8, pb: 12, minWidth: 500 }}>
        Modal info
      </div>
      <Button onClick={() => setModalOpen(false)}>Close modal</Button>
    </DesktopModal>
  </>
</>
```
