The TableFilters component is supposed to be used with `Table` to provide actions, search input and filter controllers for the table. It's not included in the Table component for flexibility in how to layout them in your pages. You could have one TableFilters control the filters and search for multiple tables for example.

Using it is pretty simple, inside the `TableFilters` component, use one `TableFilters.Item` for each item, and inside the `Item` you can use a `Button`, `Input`, `Select` or whatever you need.

### TableFilters.Item Props

##### label

- The text that will be shown next to the item

##### minWidth

- The minimum width the Item should have, in case it needs to shrink due to not enough space on screen.

##### grows

- A boolean signaling if the Item should grow to fill the screen or not. Defaults to false.

### Example

```jsx
import { Button, Select, Input } from '../';

<TableFilters>
  <TableFilters.Item>
    <Button variant="filled" color="primary">
      New Study
    </Button>
  </TableFilters.Item>
  <TableFilters.Item grows>
    <Input
      placeholder="Search studies by ID, patient or doctor"
      iconName="IconSearch"
    />
  </TableFilters.Item>
  <TableFilters.Item label="Study status">
    <Select>
      <Select.Option value="all">All</Select.Option>
      <Select.Option value="active">Active</Select.Option>
      <Select.Option value="inactive">Inactive</Select.Option>
      <Select.Option value="pending">Pending</Select.Option>
    </Select>
  </TableFilters.Item>
  <TableFilters.Item label="Study type">
    <Select>
      <Select.Option value="all">All</Select.Option>
      <Select.Option value="inactive">Inactive</Select.Option>
      <Select.Option value="pending">Pending</Select.Option>
    </Select>
  </TableFilters.Item>
</TableFilters>;
```

Without a search input

```jsx
import { Button, Select } from '../';

<TableFilters>
  <TableFilters.Item>
    <Button variant="filled" color="primary">
      New Study
    </Button>
  </TableFilters.Item>
  <TableFilters.Item grows />
  <TableFilters.Item label="Study status">
    <Select>
      <Select.Option value="all">All</Select.Option>
      <Select.Option value="active">Active</Select.Option>
      <Select.Option value="inactive">Inactive</Select.Option>
      <Select.Option value="pending">Pending</Select.Option>
    </Select>
  </TableFilters.Item>
  <TableFilters.Item label="Study type">
    <Select>
      <Select.Option value="all">All</Select.Option>
      <Select.Option value="inactive">Inactive</Select.Option>
      <Select.Option value="pending">Pending</Select.Option>
    </Select>
  </TableFilters.Item>
</TableFilters>;
```
