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
import Popover from "../Popover/Popover"

export interface AutocompleteProps<T extends unknown> {
  /** An array of button props, each one corresponds to a Button rendered at the input end. */
  buttons?: ButtonProps[]
  /** The helper text content */
  helperText?: string
  /** The id of the `input` element. Use this prop to make label and `helperText` accessible for screen readers */
  id?: string
  /** The label content */
  label?: string
  /** It basically returns the changes object of Combobox state with the input value, which must be used to filter the auto-complete options. */
  onInputValueChange: (comboboxStateChange: UseComboboxStateChange<T>) => void
  /** Callback fired when the selected item is changed */
  onSelectedItemChange: (changes: UseComboboxStateChange<T>) => void
  /** Text to show after label if field is not required (optional) */
  optionalText?: string
  /** The Array with the options to be rendered */
  options: T[]
  /** It will return the string equivalent of the item which will be used for displaying the item in the <input> once selected */
  optionToString: (option: T | null) => string
  /** Placeholder text content */
  placeholder?: string
  /** The function responsible to render the option, must return a ReactNode */
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
  /** Renders the selected item as html */
  renderSelectedItem?: (option: T) => ReactNode
  /** If `true`, the `input` is required */
  required?: boolean
  /** Text to show after label if field is required */
  requiredText?: string
  /** The value of the `input` element */
  selectedOption?: T | null
  /** Controls which state the `input` will be displayed in */
  status?: "error" | "loading" | "success"
  /** Responsible for rendering the `Currently showing x results from a total of y`, where y is the totalCount */
  totalCount?: number
}

export default forwardRef(function Autocomplete<T>(
  {
    buttons,
    helperText,
    id,
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
    totalCount = 0,
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
    id,
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
        <div sx={{ display: "flex", gap: 1 }}>
          <label
            {...getLabelProps()}
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
      <div>
        <Popover
          isInteractive
          content={
            <div
              {...getMenuProps({}, { suppressRefError: true })}
              sx={{
                background: "#fff",
                border: "1px solid #E8E8E9",
                borderRadius: 4,
                boxShadow: "0px 1px 12px rgba(0, 0, 0, 0.16)",
                minWidth: containerRef.current?.getClientRects()[0].width,
                outline: "0",
                overflowX: "hidden",
                overflowY: "auto",
                padding: 4,
                transition: "opacity .1s ease",
                "& > div": {
                  cursor: "pointer",
                },
                "& > div#total-count": {
                  cursor: "initial",
                },
              }}
            >
              {options.map((item, index, array) => (
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
              {(totalCount > options.length || options.length === 0) && (
                <div
                  id="total-count"
                  sx={{
                    backgroundColor: "inherit",
                    bottom: 0,
                    color: "text.40",
                    cursor: "none",
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
                  {totalCount > options.length && (
                    <React.Fragment>
                      Currently showing <span>{options.length}</span> results
                      from a total of <span>{totalCount}</span>.
                    </React.Fragment>
                  )}
                  {options.length === 0 && (
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
          }
          isVisible={isOpen}
          placement="bottom-start"
          noPadding
        >
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
                value: inputValue || "",
              })}
              sx={{
                backgroundColor: "transparent",
                border: "none",
                color: "text.0",
                flexGrow: 1,
                opacity: !selectedOption || isOpen ? 1 : 0,
                outline: 0,
                p: 0,
                py: "2px", // the 2px border counts towards height, so we need 6px instead of 8px for the correct height
                variant: "text.body1",
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
        </Popover>
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
    </div>
  )
}) as <T extends unknown>(
  p: AutocompleteProps<T> & { ref?: Ref<HTMLInputElement> }
) => ReactElement
