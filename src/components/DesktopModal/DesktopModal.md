### Example

```jsx
import Button from "../Button/Button"
const [isOpen, setModalOpen] = React.useState(false)

;<>
  <Button onClick={() => setModalOpen(!isOpen)}>Toggle Open</Button>
  <DesktopModal
    onClose={() => setModalOpen(false)}
    onSubmit={() => alert("submitted")}
    isVisible={isOpen}
    {...props}
    title="Create new organization"
  >
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
```
