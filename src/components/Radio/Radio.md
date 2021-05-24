
#### Default use:

This is a simple use case for radio buttons

```js
import Radio from "./Radio";
  <>
    <Radio
      id="stttf"
      name="drax"
      value="value 1"
      label="Option Y"
      onChange={() => {}}
    />
    <Radio
      id="sttuf"
      name="drax"
      value="value 2"
      label="Option X"
      onChange={() => {}}
    />
  </>
```

#### Using it as Radio Group:

This is the most common case, we tend to use radio groups in our daily basis

```js
import Radio from "./Radio";

<RadioGroup onChange={ (e) => console.log(e.target.value)}>
  <Radio
    id="stttf"
    name="drax"
    value="value 1"
    label="Option Y"
  />
  <Radio
    id="sttuf"
    name="drax"
    value="value 2"
    label="Option X"
  />
</RadioGroup>
```
