#### Default:
```jsx
import { useThemeUI } from 'theme-ui';
const { theme } = useThemeUI();

<Icon name="IconAlertTriangle" color={theme.colors.highlight} size={20} stroke={2} />
```

#### Thicker Icon:

```js

import { useThemeUI } from 'theme-ui';
const { theme } = useThemeUI();

<Icon name="IconAlertTriangle" color={theme.colors.highlight} size={20} stroke={4} />

```

#### Primary Icon:

```js

import { useThemeUI } from 'theme-ui';
const { theme } = useThemeUI();

<Icon name="IconAlertTriangle" color={theme.colors.primary} size={20} stroke={2} />

```


#### Large Icon:

```js

import { useThemeUI } from 'theme-ui';
const { theme } = useThemeUI();

<Icon name="IconAlertTriangle" color={theme.colors.primary} size={24} stroke={2} />

```