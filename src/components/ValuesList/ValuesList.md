Component to render a vertical list of label/value pairs

### Example
```jsx
import Icon from '../Icon/Icon'
;(
  <ValuesList>
    <ValuesList.Item>
      <ValuesList.Label>ECG Monitor</ValuesList.Label>
      <ValuesList.Value>
        <span sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Icon name="IconRouter" sx={{ color: "secondary" }} /> WinCardio USB
        </span>
      </ValuesList.Value>
    </ValuesList.Item>
    <ValuesList.Item hideDivider>
      <ValuesList.Label>Electrodes</ValuesList.Label>
      <ValuesList.Value>
        <span sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Icon name="IconAlertTriangle" /> 6 connected
        </span>
      </ValuesList.Value>
    </ValuesList.Item>
  </ValuesList>
)
```

### With Less Spacing
```jsx
import Icon from '../Icon/Icon'
;(
  <ValuesList itemSpacing="12px">
    <ValuesList.Item>
      <ValuesList.Label>ECG Monitor</ValuesList.Label>
      <ValuesList.Value>
        <span sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Icon name="IconRouter" sx={{ color: "secondary" }} /> WinCardio USB
        </span>
      </ValuesList.Value>
    </ValuesList.Item>
    <ValuesList.Item hideDivider>
      <ValuesList.Label>Electrodes</ValuesList.Label>
      <ValuesList.Value>
        <span sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Icon name="IconAlertTriangle" /> 6 connected
        </span>
      </ValuesList.Value>
    </ValuesList.Item>
  </ValuesList>
)
```
