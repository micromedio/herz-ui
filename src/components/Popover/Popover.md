The Popover component is used to display anything in a popover (e.g. a tooltip).

### Light Theme

```jsx
import Button from '../Button/Button';
import Popover from './Popover';
<Popover
  content={<div style={{ height: 50, width: 100 }}>Popover Content</div>}
  trigger={['click']}
  theme="light"
>
  <Button>Reference Element</Button>
</Popover>;
```

### Dark Theme

```jsx
import Popover from './Popover';
import Button from '../Button/Button';
<Popover
  content={<div style={{ height: 50, width: 100 }}>Popover Content</div>}
  trigger={['click']}
  theme="dark"
>
  <Button>Reference Element</Button>
</Popover>;
```

### With Arrow

```jsx
import Popover from './Popover';
import Button from '../Button/Button';
<Popover
  content={<div style={{ height: 50, width: 100 }}>Popover Content</div>}
  trigger={['click']}
  theme="dark"
  hasArrow
>
  <Button>Reference Element</Button>
</Popover>;
```

### With Background Overlay

```jsx
import Popover from './Popover';
import Button from '../Button/Button';
<Popover
  content={<div style={{ height: 50, width: 100 }}>Popover Content</div>}
  hasBackgroundOverlay
>
  <Button>Reference Element</Button>
</Popover>;
```

### Interactive

```jsx
import Popover from './Popover';
import Button from '../Button/Button';
<Popover
  content={<div style={{ height: 50, width: 100 }}>Popover Content</div>}
  isInteractive
>
  <Button>Reference Element</Button>
</Popover>;
```

### Triggers on click

```jsx
import Popover from './Popover';
import Button from '../Button/Button';
<Popover
  content={<div style={{ height: 50, width: 100 }}>Popover Content</div>}
  trigger={['click']}
  hideOnClick
>
  <Button>Reference Element</Button>
</Popover>;
```
