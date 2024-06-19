Uploader that accepts multiple files example:

```js
const [files, setFiles] = React.useState([]);

<Uploader files={files} onChange={(files) => setFiles(files)} multiple={true}>
  <span style={{ color: '#777' }}>
    Drag & drop or{' '}
    <span
      style={{
        color: '#0082FC',
      }}
    >
      browse
    </span>{' '}
    the activation file you received by e-mail here
  </span>
</Uploader>;
```
