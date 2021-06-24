ListSelect is a variation of the Select component, where all the options are shown in a list format

### Example
```js
import Icon from '../Icon/Icon'
const [selected, setValue] = React.useState('walk')

;(
  <ListSelect
    selected={selected}
    onSelect={(value) => setValue(value)}
    options={[
      {
        label: "Walk",
        value: "walk",
        suffix: <Icon name="IconWalk" />,
        affix: "WALK",
      },
      {
        label: "Train",
        value: "train",
        suffix: <Icon name="IconTrain" />,
        affix: "TRAIN",
      },
      {
        label: "Car",
        value: "car",
        suffix: <Icon name="IconCar" />,
        affix: "CAR",
      },
      {
        label: "Plane",
        value: "plane",
        suffix: <Icon name="IconPlane" />,
        affix: "PLANE",
      },
    ]}>
  </ListSelect>
)
```
