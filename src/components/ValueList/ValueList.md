Component to render a vertical list of label/value pairs

### Example
```jsx
import Icon from '../Icon/Icon'
;(<ValueList items={[
    {
      label: "ECG Monitor",
      value: (
        <span style={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Icon name="IconRouter" style={{ color: "secondary.0" }} /> WinCardio USB
        </span>
      ),
    },
    {
      label: "Electrodes",
      value: (
        <span style={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Icon name="IconAlertTriangle" /> 6 connected
        </span>
      ),
    },
  ]}>
</ValueList>)
```
