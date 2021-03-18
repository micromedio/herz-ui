Uploader that accepts multiple files example:

```js
/** @jsx jsx */
import { jsx, Text } from "theme-ui"

const [files, setFiles] = React.useState([])

;<Uploader files={files} onChange={(files) => setFiles(files)} multiple={true}>
  <Text>
    Drag & drop or{" "}
    <span
      sx={{
        color: "secondary.0",
      }}
    >
      browse
    </span>{" "}
    the activation file you received by e-mail here
  </Text>
</Uploader>
```
