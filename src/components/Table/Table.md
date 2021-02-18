The table component is used to display tabular data, with options for sorting and pagination, handled in the client or externally (i.e. server-side)

### Basic Example:

```jsx
import mockData from "./__mocks__/data"

const columns = React.useMemo(() => {
  return [
    {
      Header: "Study #",
      accessor: "id",
      highlight: true,
    },
    {
      Header: "Patient",
      accessor: "patient.name",
    },
    {
      Header: "Referring physician",
      accessor: "physician.name",
    },
  ]
}, [])

;(
  <Table
    data={mockData}
    columns={columns}
    initialPageSize={5}
  />
)
```

## Columns definition

The `columns` prop is responsible for specifying how and which columns are supposed to be rendered from the data passed. It's important that this value is memoized to avoid unnecessary re-renders of the table.

For example, let's say our data is in this format:

```js static
const data = [
  ...
  {
    id: "HBPM557",
    patient: {
      name: "Janis Little",
      ssn: "846634280",
    },
    physician: {
      name: "Sam Kreiger",
    },
    status: "pre-registered",
    startDate: Date('2020/04/28'),
  },
  ...
]
```

One way we could declare our columns is like this:

```js static
const columns = [
  {
    Header: "Study #",
    accessor: "id",
    highlight: true,
  },
  {
    Header: "Patient",
    accessor: "patient.name",
  },
  {
    Header: "Patient SSN",
    accessor: "patient.ssn",
  },
  {
    Header: "Referring physician",
    accessor: "physician.name",
  },
  {
    Header: "Status",
    accessor: "status",
  },
]
```

The order of the array is the order in which the columns will show up, each item in the array specifies how to render that column.

Some of the main properties of each column object are:

##### Header (`string`)
- Controls the title of the column

##### accessor (`string`)
- The key path to access the data of this column (e.g. the patient name is under `patient.name` in the data object)

##### hightlight (`boolean`)
- If `true`, rows render with the highlight color

##### align (`start` | `end` | `center`)
- Defaults to `start`
- Controls the alignment of the text in this column, in the header as well as the rows


## Controlled Pagination / Sorting

If your data is coming from an external source, from a server for example, your client probably won't have the whole dataset to be able to paginate and sort, so that will be done outside the table.

For that common use-case we can enable manual sorting and pagination in the table through the props `manualSorting` and `manualPagination`.

### Manual Pagination

When manual pagination is enabled, the table won't handle the pagination of the data and everything passed to the `data` prop will be rendered in the same page (normally the current page is all you'll get from the server). For the same reason the Table component doesn't know how many items or pages there are in total, so that will be passed through the `totalCount` and `pageCount` props, respectively.

While the data is not paginated by the component, the current page and page size are controlled by the table, and when either of these change (e.g. when the user clicks the button for another page) the callback passed through the `onTableChange` prop will be called with the new values, and that can be used to update the data.

#### Example

This example shows how the pagination of the data can be controlled externally from the Table component. In a real application the data will probably be coming from a server after a delay, in which case you can set the `loading` prop to `true` while that is happening.

```js static
const [paginatedData, setPaginatedData] = React.useState(data.slice(0, 10))
const [pageSize, setPageSize] = React.useState(5)

const pageCount = React.useMemo(() => {
  const size = data.length
  return Math.ceil(size / pageSize)
}, [pageSize])

const onTableChange = React.useCallback(({ pageIndex, pageSize }) => {
  setPageSize(pageSize)

  // simulating server-side pagination
  setPaginatedData(
    mockData.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
  )
}, [])

const columns = React.useMemo(() => {
  return [
    {
      Header: "Study #",
      accessor: "id",
      highlight: true,
    },
    {
      Header: "Patient",
      accessor: "patient.name",
    },
    {
      Header: "Referring physician",
      accessor: "physician.name",
    },
  ]
}, [])

return (
  <Table
    columns={columns}
    data={paginatedData}
    manualPagination
    pageCount={pageCount}
    totalCount={data.length}
    onTableChange={onTableChange}
    initialPageSize={pageSize}
  />
)
```

```js
import mockData from "./__mocks__/data"

const [paginatedData, setPaginatedData] = React.useState(mockData.slice(0, 10))
const [pageSize, setPageSize] = React.useState(5)

const pageCount = React.useMemo(() => {
  const size = mockData.length
  return Math.ceil(size / pageSize)
}, [pageSize])

const onTableChange = React.useCallback(({ pageIndex, pageSize }) => {
  setPageSize(pageSize)

  // simulating server-side pagination
  setPaginatedData(
    mockData.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
  )
}, [])

const columns = React.useMemo(() => {
  return [
    {
      Header: "Study #",
      accessor: "id",
      highlight: true,
    },
    {
      Header: "Patient",
      accessor: "patient.name",
    },
    {
      Header: "Referring physician",
      accessor: "physician.name",
    },
  ]
}, [])

;(
  <Table
    columns={columns}
    data={paginatedData}
    manualPagination
    pageCount={pageCount}
    totalCount={mockData.length}
    onTableChange={onTableChange}
    initialPageSize={5}
  />
)
```

In this case you can see the sorting is not manual, so sorting is handled by the Table, however as the only data available for the table is that of the current page, you can see that only the items in the current page change order.

### Manual Sorting

When manual sorting is enabled, the table won't handle the sorting of the data, so the data will have to be passed to the component already sorted according to the selected sorting rules.

While the data is not sorted by the component, which columns are sorted and in which order is controlled by the table, and when either of these change (e.g. when the user clicks the header of a column) the callback passed through the `onTableChange` prop will be called with the new sorting values, and that can be used to update the data.

#### Example

This example shows how the sorting of the data can be controlled externally from the Table component. In a real application the data will probably be coming from a server after a delay, in which case you can set the `loading` prop to `true` while that is happening.

```js static
import _ from 'lodash'

const [sortedData, setSortedData] = React.useState(data)

const onTableChange = React.useCallback(
  ({ sortBy }) => {
    let temporaryData = data
    // simulating server-side sorting
    if (sortBy) {
      temporaryData = _.sortBy(temporaryData, (item) =>
        _.get(item, sortBy.id)
      )
      if (sortBy.desc) temporaryData = temporaryData.reverse()
    }
    setSortedData(temporaryData)
  },
  [data]
)

const columns = React.useMemo(() => {
  return [
    {
      Header: "Study #",
      accessor: "id",
      highlight: true,
    },
    {
      Header: "Patient",
      accessor: "patient.name",
    },
    {
      Header: "Referring physician",
      accessor: "physician.name",
    },
  ]
}, [])

return (
  <Table
    columns={columns}
    manualSorting
    data={sortedData}
    onTableChange={onTableChange}
    initialPageSize={5}
  />
)
```

```js
import _ from 'lodash'
import mockData from "./__mocks__/data"

const [sortedData, setSortedData] = React.useState(mockData)

const onTableChange = React.useCallback(
  ({ sortBy }) => {
    let temporaryData = mockData
    // simulating server-side sorting
    if (sortBy) {
      temporaryData = _.sortBy(temporaryData, (item) =>
        _.get(item, sortBy.id)
      )
      if (sortBy.desc) temporaryData = temporaryData.reverse()
    }
    setSortedData(temporaryData)
  },
  []
)

const columns = React.useMemo(() => {
  return [
    {
      Header: "Study #",
      accessor: "id",
      highlight: true,
    },
    {
      Header: "Patient",
      accessor: "patient.name",
    },
    {
      Header: "Referring physician",
      accessor: "physician.name",
    },
  ]
}, [])

;(
  <Table
    columns={columns}
    manualSorting
    data={sortedData}
    onTableChange={onTableChange}
    initialPageSize={5}
  />
)
```

### Filtering

As the filters will live outsite the table, this component doesn't handle any filtering logic at the moment. So to handle filtering you have to manually filter the data before passing it to the table.
