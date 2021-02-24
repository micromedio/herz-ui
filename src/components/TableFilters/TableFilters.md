The TableFilters component is supposed to be used with `Table` to provide actions, search input and filter controllers for the table. It's not included in the Table component for flexibility in how to layout them in your pages. You could have one TableFilters control the filters and search for multiple tables for example.

Using it is pretty simple, the props `actions`, `search` and `filters` are responsible for handling what will be displayed, as seen below.

### Props

#### actions

The `actions` prop is where the actions shown are defined. It receives an array of objects in the format:

```js static
{
  label: string
  color?: string
  variant?: string
  disabled?: boolean
  onClick: function
}
```

##### label
- The text that will be shown on the button of the action

##### color
- The color of the button, defaults to `primary`

##### variant
- The button variant, defaults to `filled`

##### disabled
- True if the button is disabled, defaults to `false`

##### onClick
- The callback function to be called when the button is clicked


#### filters and onFilterChange
The `filters` prop is where the filters shown are defined. It receives an array of objects in the format:

```js static
{
  key: string
  label?: string
  value?: string
  options: Array<{
    label: string
    value: string | number
  }>
}
```

##### key
- The key for this filter. When this filter changes it will be passed to the `onFilterChange` callback along with the new value
- Usually you want this to be the name of the property in your data that this filter will filter by (e.g. a filter select for the status of a patient would use `status` as the key, if that is the name of the property where the status is stored in the patient data object)

##### label
- The Select label

##### value
- The controlled value of the `Select`

##### options
- An array of objects for the options of the Select
- For more information see the `DropdownSelect` component

##### onFilterChange
- This is the callback that will be called when there's a change in any of the Select components
- It's called with the changed filter `key` and the new `value`

#### search, hideSearch and onSearchChange
The `search` prop is where the input props are defined. It receives an object in the format:

```js static
{
  placeholder: string
  value: string
  minWidth?: number
}
```

##### placeholder
- The input placeholder text

##### value
- The controlled value of the input

##### minWidth
- The minimum width this input can shrink to. Defaults to `200` (px)
- The input tries to occupy all the remaining space in the line, but can only shrink up to this size, if necessary the filters will wrap into a new line to give space to the input

##### hideSearch
- A boolean used to hide the search input

##### onSearchChange
- This is the callback that will be called when there's a change in the input
- It's called with the new `value` of the input


### Example

```jsx
<TableFilters
  actions={[
    {
      label: "New Study",
      onClick: () => alert('new study'),
    },
  ]}
  search={{
    placeholder: "Search studies by ID, patient or doctor",
  }}
  filters={[
    {
      key: "status",
      label: "Study status",
      options: [
        { value: "all", label: "All" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
        { value: "pending", label: "Pending" },
      ],
    },
    {
      key: "type",
      label: "Study type",
      options: [
        { value: "all", label: "All" },
        { value: "inactive", label: "Inactive" },
        { value: "pending", label: "Pending" },
      ],
    },
  ]}
/>
```

Without a search input
```jsx
<TableFilters
  actions={[
    {
      label: "New Study",
      onClick: () => alert('new study'),
    },
  ]}
  hideSearch
  filters={[
    {
      key: "status",
      label: "Study status",
      options: [
        { value: "all", label: "All" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
        { value: "pending", label: "Pending" },
      ],
    },
    {
      key: "type",
      label: "Study type",
      options: [
        { value: "all", label: "All" },
        { value: "inactive", label: "Inactive" },
        { value: "pending", label: "Pending" },
      ],
    },
  ]}
/>
```
