The DateSelect component is a more specialized Select to be used when selecting date ranges

### Example

```js
<DateSelect>
  <DateSelect.Option value={{ from: '12/05/2021', to: '12/05/2021' }}>
    Today
  </DateSelect.Option>
  <DateSelect.Option value={{ from: '13/05/2021', to: '13/05/2021' }}>
    Tomorrow
  </DateSelect.Option>
  <DateSelect.Option value={{ from: '09/05/2021', to: '15/05/2021' }}>
    This week
  </DateSelect.Option>
  <DateSelect.Option value={{ from: '16/05/2021', to: '22/05/2021' }}>
    Next week
  </DateSelect.Option>
  <DateSelect.Option value={{ from: '01/05/2021', to: '31/05/2021' }}>
    This month
  </DateSelect.Option>
  <DateSelect.Option value={{ from: '01/05/2021', to: '30/05/2021' }}>
    Next month
  </DateSelect.Option>
</DateSelect>
```
