/** @jsxRuntime classic /*
/** @jsx jsx */
import React, {
  forwardRef,
  ReactElement,
  ReactNode,
  Ref,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react"
import { HerzUITheme, jsx, SxStyleProp } from "theme-ui"
import { useCombobox, UseComboboxStateChange } from "downshift"
import Button, { ButtonProps } from "../Button/Button"

export interface AutocompleteProps<T extends unknown> {
  buttons?: ButtonProps[]
  helperText?: string
  id?: string
  inputLabelId?: string
  label?: string
  onInputValueChange: (comboboxStateChange: UseComboboxStateChange<T>) => void
  onSelectedItemChange: (changes: UseComboboxStateChange<T>) => void
  optionalText?: string
  options: T[]
  optionToString: (option: T | null) => string
  placeholder?: string
  renderOption: ({
    highlightedIndex,
    defaultStyles,
    option,
    inputValue,
    index,
    array,
  }: {
    highlightedIndex: number
    defaultStyles: SxStyleProp
    option: T
    inputValue: string
    index?: number
    array?: T[]
  }) => ReactNode
  renderSelectedItem?: (option: T) => ReactNode
  required?: boolean
  requiredText?: string
  selectedOption?: T | null
  status?: "error" | "loading" | "success"
  totalCount?: number
}

export default forwardRef(function Autocomplete<T>(
  {
    buttons,
    helperText,
    id,
    inputLabelId,
    label,
    onInputValueChange,
    onSelectedItemChange,
    optionalText,
    options,
    optionToString,
    placeholder = "",
    required,
    requiredText,
    renderOption,
    renderSelectedItem,
    selectedOption,
    status,
    totalCount,
  }: AutocompleteProps<T>,
  ref: Ref<HTMLInputElement>
) {
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
    ref,
    () => inputRef.current
  )
  const {
    getComboboxProps,
    getInputProps,
    getItemProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    inputValue,
    isOpen,
    openMenu,
    setInputValue,
  } = useCombobox({
    items: options,
    itemToString: optionToString,
    onInputValueChange,
    onIsOpenChange: ({ isOpen: open }) => {
      if (!open) {
        setInputValue(optionToString(selectedOption as T | null))
        inputRef.current?.blur()
      } else {
        inputRef.current?.focus()
      }
    },
    onSelectedItemChange: (changes) => {
      onSelectedItemChange(changes)
    },
    selectedItem: selectedOption,
  })

  const styles: Record<string, SxStyleProp> = {
    active: {
      borderColor: "secondary.0",
      boxShadow: (theme: HerzUITheme) =>
        `0px 0px 0px 4px ${theme.colors.secondary.alpha[90]}`,
      backgroundColor: "#FFF",
    },
  }

  const state = useMemo(() => {
    if (status) return status
    return "default"
  }, [status])

  const inputArias = {
    // eslint-disable-next-line unicorn/no-array-reduce
    ...Object.keys(getInputProps()).reduce(
      (accumulative, current) =>
        current.includes("aria")
          ? { ...accumulative, [current]: getInputProps()[current] }
          : accumulative,
      {}
    ),
  }

  return (
    <div
      sx={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      {label && (
        <div {...getLabelProps()} sx={{ display: "flex", gap: 1 }}>
          <label
            htmlFor={id}
            id={inputLabelId}
            sx={{
              color: "text.0",
              variant: "text.body1",
            }}
          >
            {label}
          </label>
          <span
            sx={{
              color: "text.40",
              variant: "text.body2",
            }}
          >
            ({required ? requiredText : optionalText})
          </span>
        </div>
      )}
      <div
        {...getComboboxProps({
          ref: containerRef,
        })}
        sx={{
          alignItems: "center",
          backgroundColor: "transparent",
          border: "2px solid transparent",
          borderRadius: 2,
          display: "flex",
          gap: 2,
          outline: 0,
          paddingX: 3,
          paddingY: 1,
          position: "relative",
          transition: "all 0.2s",
          width: "100%",
          ...(state === "loading" ? styles.active : {}),
          ...{
            default: {
              backgroundColor: selectedOption
                ? "secondary.alpha.90"
                : "text.alpha.95",
            },
            loading: {},
            success: {
              backgroundColor: "success.alpha.95",
              borderColor: "success.0",
            },
            error: {
              backgroundColor: "primary.alpha.95",
              borderColor: "primary.0",
            },
          }[state],
          "&:hover": {
            ...(state === "default" && {
              backgroundColor: selectedOption
                ? "secondary.alpha.85"
                : "text.alpha.90",
            }),
          },
          "&:focus-within": {
            ...(isOpen && styles.active),
          },
          "& *": { transition: "all 0.2s, visibility 0s" },
        }}
      >
        <input
          {...getInputProps({
            "aria-invalid": status === "error",
            autoComplete: "off",
            disabled: status === "loading",
            size: 1, // input has a default size property of 20, which limits it's minimum width. Setting it to 1 and handling width through the parent so that we can control the input width better.
            onFocus: () => {
              if (!isOpen) openMenu()
            },
            placeholder,
            ref: inputRef,
            type: "text",
            value: inputValue,
          })}
          sx={{
            backgroundColor: "transparent",
            border: "none",
            color: "text.0",
            flexGrow: 1,
            outline: 0,
            p: 0,
            py: "2px", // the 2px border counts towards height, so we need 6px instead of 8px for the correct height
            variant: "text.body1",
            visibility: !selectedOption || isOpen ? "visible" : "hidden",
            width: "100%",
          }}
        />
        {(!selectedOption || isOpen) && (
          <Button
            {...inputArias}
            aria-label="Search"
            color="text"
            iconName="IconSearch"
            onClick={() => {
              inputRef.current?.focus()
            }}
            size="small"
            sx={{
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
              },
              "&:not([disabled]):hover": {
                backgroundColor: "transparent",
              },
            }}
          />
        )}
        {!isOpen && selectedOption && (
          <div
            {...inputArias}
            onClick={() => {
              openMenu()
            }}
            sx={{
              overflow: "hidden",
              position: "absolute",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width: inputRef.current?.getClientRects()[0].width,
            }}
          >
            {renderSelectedItem
              ? renderSelectedItem(selectedOption)
              : optionToString(selectedOption)}
          </div>
        )}
        {buttons && buttons.length > 0 && selectedOption && !isOpen && (
          <div
            sx={{
              display: "flex",
              gap: 2,
              whiteSpace: "nowrap",
            }}
          >
            {buttons.map((button, index) => (
              <Button
                key={`autocompleteButton-${index}`}
                {...button}
                sx={{
                  borderRadius: 0,
                  height: containerRef.current?.getClientRects()[0].height,
                  margin: `-8px 0`,
                  paddingY: 0,
                  "& > button": { borderRadius: 0 },
                }}
              >
                {button.children}
              </Button>
            ))}
          </div>
        )}
      </div>
      {helperText && (
        <div
          sx={{
            ...{
              default: {
                color: "text.40",
                variant: "text.body2",
              },
              loading: {},
              success: {
                px: 3,
                pb: 2,
                color: "success.0",
                variant: "text.body1",
              },
              error: {
                px: 3,
                pb: 2,
                color: "primary.0",
                variant: "text.body1",
              },
            }[state],
          }}
        >
          {helperText}
        </div>
      )}
      <div
        {...getMenuProps()}
        sx={{
          background: "#fff",
          border: "1px solid #E8E8E9",
          borderRadius: 4,
          boxShadow: "0px 1px 12px rgba(0, 0, 0, 0.16)",
          marginTop: 3,
          minWidth: containerRef.current?.getClientRects()[0].width,
          outline: "0",
          overflowX: "hidden",
          overflowY: "auto",
          padding: 4,
          paddingBottom: totalCount ? 0 : 4,
          position: "absolute",
          transition: "opacity .1s ease",
          top:
            window.scrollY +
            (containerRef.current?.getClientRects()[0].bottom || 0),
          visibility: isOpen ? "visible" : "hidden",
          zIndex: 1000,
          "& > div": {
            cursor: "pointer",
          },
          "& > div#total-count": {
            cursor: "initial",
          },
        }}
      >
        {isOpen &&
          options.map((item, index, array) => (
            <div {...getItemProps({ item, index })} key={index}>
              {renderOption({
                highlightedIndex,
                defaultStyles: {
                  backgroundColor:
                    highlightedIndex === index
                      ? "secondary.alpha.95"
                      : undefined,
                  borderRadius: 2,
                  padding: 2,
                },
                option: item,
                inputValue,
                index,
                array,
              })}
            </div>
          ))}
        {totalCount && (
          <div
            id="total-count"
            sx={{
              backgroundColor: "inherit",
              bottom: 0,
              color: "text.40",
              cursor: "none",
              marginBottom: 4,
              padding: 2,
              position: "sticky",
              textAlign: "center",
              transition: "all 0s",
              variant: "text.body2",
              "& > span": {
                color: "text.0",
                fontWeight: 600,
              },
            }}
          >
            {options.length > 0 ? (
              <React.Fragment>
                Currently showing <span>{options.length}</span> results from a
                total of <span>{totalCount}</span>.
              </React.Fragment>
            ) : (
              <div
                sx={{
                  alignContent: "center",
                  alignItems: "center",
                  color: "text.40",
                  display: "flex",
                  gap: 3,
                  justifyContent: "center",
                  transition: "all 0s",
                }}
              >
                No results found{" "}
                <Button
                  color="secondary"
                  onClick={() => {
                    setInputValue("")
                  }}
                  size="small"
                  sx={{
                    paddingY: 0,
                  }}
                  variant="plain"
                >
                  Clear search
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}) as <T extends unknown>(
  p: AutocompleteProps<T> & { ref?: Ref<HTMLInputElement> }
) => ReactElement
