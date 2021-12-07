### Example

```jsx
import Button from "../Button/Button"
const [isOpen, setModalOpen] = React.useState(false)

;<>
  <Button onClick={() => setModalOpen(!isOpen)}>Toggle Open</Button>
  <DesktopModal isOpen={isOpen}>
    <DesktopModal.Header>
      <DesktopModal.Title>Title</DesktopModal.Title>
      <DesktopModal.Actions>
        <Button
          color="secondary"
          variant="plain"
          onClick={() => setModalOpen(false)}
        >
          Close
        </Button>
      </DesktopModal.Actions>
    </DesktopModal.Header>
    <DesktopModal.Body>
      The modal can have a body text with complementary info
    </DesktopModal.Body>
    <DesktopModal.Actions>
      <Button color="secondary" variant="filledLight">
        Some other button
      </Button>
      <Button>Primary Action</Button>
    </DesktopModal.Actions>
  </DesktopModal>
</>
```
