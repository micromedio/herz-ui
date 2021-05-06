The TableFilters component is supposed to be used with `Table` to provide actions, search input and filter controllers for the table. It's not included in the Table component for flexibility in how to layout them in your pages. You could have one TableFilters control the filters and search for multiple tables for example.

Using it is pretty simple, inside the `TableFilters` component, use one `TableFilters.Item` for each item, and inside the `Item` you can use a `Button`, `Input`, `Selector` or whatever you need.


### TableFilters.Item Props

##### label

- The text that will be shown next to the item

##### minWidth

- The minimum width the Item should have, in case it needs to shrink due to not enough space on screen.

##### grows

- A boolean signaling if the Item should grow to fill the screen or not. Defaults to false.

### Example

```jsx
import { Button, Selector, Input } from '../';

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
    <Selector
      options={[
        { value: "all", label: "All" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
        { value: "pending", label: "Pending" },
      ]}
    />
  </TableFilters.Item>
  <TableFilters.Item label="Study type">
    <Selector
      options={[
        { value: "all", label: "All" },
        { value: "inactive", label: "Inactive" },
        { value: "pending", label: "Pending" },
      ]}
    />
  </TableFilters.Item>
</TableFilters>
```

Without a search input

```jsx
import { Button, Selector } from '../';

<TableFilters>
  <TableFilters.Item>
    <Button variant="filled" color="primary">
      New Study
    </Button>
  </TableFilters.Item>
  <TableFilters.Item grows />
  <TableFilters.Item label="Study status">
    <Selector
      options={[
        { value: "all", label: "All" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
        { value: "pending", label: "Pending" },
      ]}
    />
  </TableFilters.Item>
  <TableFilters.Item label="Study type">
    <Selector
      options={[
        { value: "all", label: "All" },
        { value: "inactive", label: "Inactive" },
        { value: "pending", label: "Pending" },
      ]}
    />
  </TableFilters.Item>
</TableFilters>
```
