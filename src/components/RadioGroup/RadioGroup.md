#### Using it as Radio Group:

This is the most common case, we tend to use radio groups in our daily basis

```js
import Radio from './../Radio/Radio';

const [value, setValue] = React.useState();

<Radio.Group
  name="inputGroup"
  value={value}
  onChange={(e) => console.log(e.target.value)}
>
  <Radio value="value 1" label="Option Y" />
  <Radio value="value 2" label="Option X" />
</Radio.Group>;
```
