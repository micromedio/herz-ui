/** @jsxRuntime classic /
/** @jsx jsx */
import { useCallback, useMemo, useState } from "react"
import { jsx } from "theme-ui"
import Button from "../Button/Button"
import Select, { SelectProps } from "../Select/Select"
import { SelectOptionCustom } from "../Select/SelectOptionCustom"
import { Rifm } from "rifm"
import TextField from "../TextField/TextField"
import { SelectOptionProps } from "../Select/SelectOption"
import { parse, isValid } from "date-fns"

const parseDigits = (value: string) => (value.match(/\d+/g) || []).join("")

const formatDate = (value: string) => {
  const digits = parseDigits(value)
  const chars = digits.split("")
  return (
    chars
      // eslint-disable-next-line unicorn/no-array-reduce
      .reduce(
        (r, v, index) =>
          index === 2 || index === 4 ? `${r}/${v}` : `${r}${v}`,
        ""
      )
      .slice(0, 10)
  )
}

interface DateValue {
  to: string
  from: string
}

const DateSelectOption = (props: SelectOptionProps<DateValue>) => {
  return <Select.Option {...props} />
}

export interface DateSelectProps {
  /** The id of the DateSelectProps. Use this prop to make label and `helperText` accessible for screen readers */
  id?: SelectProps["id"]
  /** Label text to be placed before the element */
  label?: SelectProps["label"]
  /** The placeholder text, shown when there is no selected value */
  placeholder?: SelectProps["placeholder"]
  /** The value of the `select` element, required for a controlled component */
  value?: DateValue
  /** Default value which will not trigger the `filled` select state */
  defaultValue?: DateValue
  /** Whether the component is disabled or not */
  disabled?: SelectProps["disabled"]
  /** Callback fired when the value is changed */
  onChange?: (changes: DateValue) => void
  /** Highlight the select when it's in a `filled` state */
  highlightFilled?: SelectProps["highlightFilled"]
  /** Select grows to fill the width of the parent */
  fullWidth?: SelectProps["fullWidth"]
  children: SelectProps["children"]
  /** Format in which the date should be in, defaults to 'MM/dd/yyyy' */
  dateFormat?: string
}

const DateSelect = ({
  id,
  label,
  placeholder,
  value,
  defaultValue,
  disabled = false,
  onChange,
  highlightFilled = true,
  fullWidth = false,
  children,
  dateFormat = "MM/dd/yyyy",
}: DateSelectProps) => {
  const [fromValue, setFromValue] = useState("")
  const [toValue, setToValue] = useState("")

  const isDateFromValid = useMemo(() => {
    if (!fromValue) return true
    const dateFrom = parse(fromValue, dateFormat, new Date())
    return isValid(dateFrom)
  }, [dateFormat, fromValue])

  const isDateToValid = useMemo(() => {
    if (!toValue) return true
    const dateTo = parse(toValue, dateFormat, new Date())
    return isValid(dateTo)
  }, [dateFormat, toValue])

  const isFormValid = useMemo(() => {
    const dateFrom = parse(fromValue, dateFormat, new Date())
    const dateTo = parse(toValue, dateFormat, new Date())
    if (!isValid(dateFrom) || !isValid(dateTo) || dateFrom > dateTo)
      return false

    return true
  }, [dateFormat, fromValue, toValue])

  const [customValue, setCustomValue] = useState({ to: "", from: "" })

  const resetValue = useCallback(() => {
    setFromValue(customValue.from)
    setToValue(customValue.to)
  }, [customValue.from, customValue.to])

  return (
    <Select
      id={id}
      label={label}
      placeholder={placeholder}
      value={value as SelectProps["value"]}
      defaultValue={defaultValue as SelectProps["defaultValue"]}
      disabled={disabled}
      onChange={(value) => {
        if (value) onChange?.((value as unknown) as DateValue)
      }}
      highlightFilled={highlightFilled}
      fullWidth={fullWidth}
    >
      {children}
      <SelectOptionCustom
        value={customValue}
        onHide={resetValue}
        label={
          customValue.from === customValue.to
            ? customValue.from
            : `${customValue.from} - ${customValue.to}`
        }
      >
        {({ closeMenu, selectItem }) => {
          const onSubmit = () => {
            const value = {
              from: fromValue,
              to: toValue,
            }
            setCustomValue(value)
            selectItem(value)
            onChange?.(value)
            closeMenu()
          }

          return (
            <form
              onSubmit={(event) => {
                event.preventDefault()
                onSubmit()
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.stopPropagation()
                  onSubmit()
                }
              }}
            >
              <div
                sx={{
                  display: "grid",
                  rowGap: 3,
                  columnGap: 2,
                  gridTemplateColumns: "auto 1fr",
                  alignItems: "center",
                  width: 180,
                }}
              >
                <label
                  htmlFor="dateFrom"
                  sx={{
                    variant: "text.body1",
                    color: "text.40",
                    textAlign: "end",
                  }}
                >
                  From
                </label>
                <Rifm
                  value={fromValue}
                  onChange={setFromValue}
                  format={formatDate}
                >
                  {({ onChange, value }) => (
                    <TextField
                      id="dateFrom"
                      value={value}
                      onChange={onChange}
                      placeholder={dateFormat.toLowerCase()}
                      state={isDateFromValid ? "default" : "error"}
                    />
                  )}
                </Rifm>
                <label
                  htmlFor="dateTo"
                  sx={{
                    variant: "text.body1",
                    color: "text.40",
                    textAlign: "end",
                  }}
                >
                  To
                </label>

                <Rifm value={toValue} onChange={setToValue} format={formatDate}>
                  {({ onChange, value }) => (
                    <TextField
                      id="dateTo"
                      value={value}
                      onChange={onChange}
                      placeholder={dateFormat.toLowerCase()}
                      state={isDateToValid ? "default" : "error"}
                    />
                  )}
                </Rifm>

                <Button
                  type="submit"
                  variant="filledLight"
                  color="secondary"
                  sx={{ gridColumn: "span 2" }}
                  disabled={!isFormValid}
                >
                  Set
                </Button>
              </div>
            </form>
          )
        }}
      </SelectOptionCustom>
    </Select>
  )
}

DateSelectOption.isSelectOption = true
DateSelect.Option = DateSelectOption
export default DateSelect
