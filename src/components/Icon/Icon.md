### Icon Component:
Our Icon component uses the Tabler Icon https://tabler-icons.io/.

To use a icon you simply have to get its name on the tabler listing and add it as the `name` prop

the `color` prop should be one of the following colors: "primary" "highlight" "muted" 

the `size` prop accept different values but keep in mind that 20 is the default value defined in the design specs

the `stroke` prop has different possible values, it's default is going to be `2`

#### Default:
```jsx
<Icon name="IconAlertTriangle" color="highlight" size={20} stroke={2} />
```

#### Thicker Icon:

```js

<Icon name="IconAlertTriangle" color="highlight" size={20} stroke={4} />

```

#### Primary Icon:

```js

<Icon name="IconAlertTriangle" color="highlight" size={20} stroke={2} />

```


#### Large Icon:

```js

<Icon name="IconAlertTriangle" color="highlight" size={24} stroke={2} />

```