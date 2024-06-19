Alert

### Usage

This component is very useful to warning situations, please do not mistake for snackbars
the alert will be always shown, it's static and does not leave the page.

There are 2 ways to use it:

with **relative** position it'll behave as any regular card into your page

with **fixed** position it'll stay fixed on the top of your page, always shown, independent of
your scrolling, please note that in this scenario, a aditional margin will be required to the page so the
component don't overlap any content behind it.

#### Simple Alert

```jsx
<Alert
  iconName="IconCircleCheck"
  color="success"
  title="All electrodes are connected and sensing signal"
>
  The 10-second ECG is ready to be recorded
</Alert>
```

#### Custom Icon

Our component works with built in icons from [tabler](https://tabler-icons.io/) but you can customize your own icons to it, just pass your SVG to `iconSVG`

```jsx
const svgElement = (
  <>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="21"
      viewBox="0 0 21 21"
    >
      <title>MS-SymbolLockup</title>
      <rect x="1" y="1" width="9" height="9" fill="#f25022" />
      <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
      <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
      <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
    </svg>
  </>
);
<Alert
  iconSVG={svgElement}
  color="primary"
  title="All electrodes are connected and sensing signal"
>
  The 10-second ECG is ready to be recorded
</Alert>;
```

#### Multiple states

```jsx

<Alert color="primary" title="All electrodes are connected and sensing signal">The 10-second ECG is ready to be recorded</Alert>

<Alert color="success" title="All electrodes are connected and sensing signal">The 10-second ECG is ready to be recorded</Alert>

<Alert color="warning" title="All electrodes are connected and sensing signal">The 10-second ECG is ready to be recorded</Alert>
```
