/* eslint-disable unicorn/consistent-destructuring */
/** @jsxImportSource theme-ui */
import React, {
  forwardRef,
  ReactElement,
  ReactNode,
  Ref,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react"
import { get, ThemeUICSSObject } from "theme-ui"
import {
  useCombobox,
  UseComboboxProps,
  UseComboboxStateChange,
} from "downshift"
import Button, { ButtonProps } from "../Button/Button"
import Popover from "../Popover/Popover"
import Tag, { TagProps } from "../Tag/Tag"

interface CommonProps<T extends unknown> {
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
  /** Event triggered when the menu open or close */
  onIsOpenChange?: (isOpen?: boolean) => void
  /** Text to show after label if field is not required (optional) */
  optionalText?: string
  /** The Array with the options to be rendered */
  options: T[]
  /** It will return the string equivalent of the item which will be used for displaying the item in the <input> once selected */
  optionToString?: (option: T | null) => string
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
    defaultStyles: ThemeUICSSObject
    option: T
    inputValue: string
    index?: number
    array?: T[]
  }) => ReactNode
  /** If `true`, the `input` is required */
  required?: boolean
  /** Text to show after label if field is required */
  requiredText?: string
  /** Controls which state the `input` will be displayed in */
  status?: "error" | "loading" | "success"

  styles?: {
    counterContainer?: ThemeUICSSObject
    input?: ThemeUICSSObject
    inputRoot?: ThemeUICSSObject
    label?: ThemeUICSSObject
    labelSideText?: ThemeUICSSObject
    menu?: ThemeUICSSObject
    root?: ThemeUICSSObject
  }
  /** Responsible for rendering the `Currently showing x results from a total of y`, where y is the totalCount */
  totalCount?: number
}

interface SingleProps<T extends unknown> extends CommonProps<T> {
  /** The value of the `input` element */
  defaultSelectedOption?: T
  /** Whether the component is multiselect or not */
  multiSelect?: false
  /** The value of the `input` element */
  selectedOption?: T | null
  /** Callback fired when the selected item is changed */
  onSelectedItemChange: (changes?: T | null) => void
  /** Renders the selected item as html */
  renderSelectedItem?: (option: T) => ReactNode
}

interface MultiProps<T extends unknown> extends CommonProps<T> {
  /** The value of the `input` element */
  defaultSelectedOption?: T[]
  /** The function responsible for extracting the option label for the tags */
  getOptionLabel?: (option: T) => string
  /** Clear the search input when select an option */
  keepSearchAfterSelect?: boolean
  /** Whether the component is multiselect or not */
  multiSelect: true
  /** The event handler for removing the Tag */
  onRemove?: (option: T) => void
  /** Callback fired when the selected item is changed */
  onSelectedItemsChange: (changes: T[]) => void
  /** Renders the selected items as html */
  renderSelectedItems?: (option: T[], isOpen?: boolean) => ReactNode
  /** The value of the `input` element */
  selectedOption?: T[] | null
  /** The Tag color passed to the Tag component */
  tagColor?: TagProps["color"]
}

export type AutocompleteProps<T extends unknown> =
  | SingleProps<T>
  | MultiProps<T>

export default forwardRef(function Autocomplete<T>(
  props: AutocompleteProps<T>,
  ref: Ref<HTMLInputElement>
) {
  const { keepSearchAfterSelect = false } = props.multiSelect
    ? props
    : { keepSearchAfterSelect: false }
  const {
    buttons,
    helperText,
    id,
    label,
    onInputValueChange,
    onIsOpenChange,
    optionalText,
    options,
    optionToString = (): string => {
      return ""
    },
    placeholder = "",
    required,
    requiredText,
    renderOption,
    selectedOption,
    status,
    styles,
    totalCount = 0,
  } = props
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
    ref,
    () => inputRef.current
  )
  const comboboxProps = useMemo((): Partial<UseComboboxProps<T>> | void => {
    if (props.multiSelect) {
      return {
        stateReducer: (state, actionAndChanges) => {
          const { changes, type } = actionAndChanges
          switch (type) {
            case useCombobox.stateChangeTypes.InputKeyDownEnter:
            case useCombobox.stateChangeTypes.ItemClick:
              return {
                ...changes,
                isOpen: true,
                highlightedIndex: state.highlightedIndex,
                inputValue: keepSearchAfterSelect ? state.inputValue : "",
              }
            case useCombobox.stateChangeTypes.InputBlur:
              return {
                ...changes,
                inputValue: "",
              }
            case useCombobox.stateChangeTypes.ControlledPropUpdatedSelectedItem:
              return {
                ...changes,
                inputValue: keepSearchAfterSelect ? state.inputValue : "",
              }
            default:
              return changes
          }
        },
      }
    }
    return
  }, [keepSearchAfterSelect, props.multiSelect])
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
  } = useCombobox<T>({
    id,
    items: options,
    itemToString: optionToString,
    onInputValueChange,
    onIsOpenChange: ({ isOpen: open }) => {
      if (!open) {
        if (!props.multiSelect)
          setInputValue(optionToString(selectedOption as T | null) || "")
        inputRef.current?.blur()
      } else {
        inputRef.current?.focus()
      }
      onIsOpenChange?.(open)
    },
    onSelectedItemChange: (changes) => {
      const { selectedItem: selected } = changes
      if (props.multiSelect) {
        /* istanbul ignore if */
        if (!selected) {
          return
        }
        const index = (selectedOption as T[]).indexOf(selected)
        if (index > 0) {
          props.onSelectedItemsChange([
            ...(selectedOption as T[]).slice(0, index),
            ...(selectedOption as T[]).slice(index + 1),
          ])
        } else if (index === 0) {
          props.onSelectedItemsChange([...(selectedOption as T[]).slice(1)])
        } else {
          props.onSelectedItemsChange([...(selectedOption as T[]), selected])
        }
        return
      }
      props.onSelectedItemChange(selected)
    },
    selectedItem: (selectedOption as T) || null,
    ...comboboxProps,
  })

  const activeStyles: Record<string, ThemeUICSSObject> = {
    active: {
      borderColor: "secondary",
      boxShadow: (t) =>
        `0px 0px 0px 4px ${get(t, "colors.secondary.alpha.90")}`,
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

  const hasSelectedOption = useMemo(() => {
    if (props.multiSelect) {
      return !!props.selectedOption && props.selectedOption.length > 0
    } else {
      return !!props.selectedOption
    }
  }, [props.multiSelect, props.selectedOption])

  const hasSpotlight = useMemo(() => {
    const shouldCheckForDefaultValue = !!props.defaultSelectedOption
    const defaultValueDiffers =
      JSON.stringify(props.selectedOption) !==
      JSON.stringify(props.defaultSelectedOption)
    return shouldCheckForDefaultValue
      ? (hasSelectedOption && defaultValueDiffers) || defaultValueDiffers
      : hasSelectedOption
  }, [hasSelectedOption, props.defaultSelectedOption, props.selectedOption])

  const autocompleteInput = (
    <input
      {...getInputProps({
        "aria-label": label ? undefined : "autocomplete-input",
        "aria-invalid": status === "error",
        autoComplete: "off",
        disabled: status === "loading",
        size: 1, // input has a default size property of 20, which limits it's minimum width. Setting it to 1 and handling width through the parent so that we can control the input width better.
        onFocus: () => {
          if (!isOpen) openMenu()
        },
        placeholder: props.multiSelect && hasSelectedOption ? "" : placeholder,
        ref: inputRef,
        type: "text",
        value: inputValue || "",
        onKeyDown: props.multiSelect
          ? (event) => {
              /* istanbul ignore else */
              if (!inputValue && event.key === "Backspace")
                props.onSelectedItemsChange(
                  (selectedOption as T[]).slice(0, -1)
                )
            }
          : undefined,
      })}
      sx={{
        backgroundColor: "transparent",
        border: "none",
        color: "text",
        flexGrow: 1,
        opacity: !hasSelectedOption || isOpen ? 1 : 0,
        outline: 0,
        p: 0,
        py: "2px", // the 2px border counts towards height, so we need 6px instead of 8px for the correct height
        variant: "text.body1",
        width: "auto",
        "&:not(focused)": {
          width:
            props.multiSelect && (!hasSelectedOption || isOpen) ? undefined : 0,
        },
        ...styles?.input,
      }}
    />
  )

  return (
    <div
      sx={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        gap: 2,
        ...styles?.root,
      }}
    >
      {label && (
        <div sx={{ display: "flex", gap: 1 }}>
          <label
            {...getLabelProps()}
            sx={{
              color: "text",
              variant: "text.body1",
              ...styles?.label,
            }}
          >
            {label}
          </label>
          <span
            sx={{
              color: "text.40",
              variant: "text.body2",
              ...styles?.labelSideText,
            }}
          >
            ({required ? requiredText : optionalText})
          </span>
        </div>
      )}
      <div>
        <Popover
          isInteractive
          appendTo={document?.body}
          content={
            <div
              {...getMenuProps({}, { suppressRefError: true })}
              sx={{
                background: "#fff",
                border: "1px solid #E8E8E9",
                borderRadius: 4,
                boxShadow: "0px 1px 12px rgba(0, 0, 0, 0.16)",
                flexWrap: props.multiSelect ? "wrap" : undefined,
                minWidth: containerRef.current?.getClientRects()[0].width,
                outline: "0",
                overflowX: "hidden",
                overflowY: props.multiSelect ? "hidden" : "auto",
                padding: 4,
                transition: "opacity .1s ease",
                "& > div": {
                  cursor: "pointer",
                },
                "& > div#total-count": {
                  cursor: "initial",
                },
                ...styles?.menu,
              }}
            >
              {options.map((item, index, array) => {
                const shouldHighlightSelected = (): boolean => {
                  if (props.multiSelect) {
                    return (
                      (selectedOption as T[]).some(
                        (selected) =>
                          JSON.stringify(selected) === JSON.stringify(item)
                      ) || highlightedIndex === index
                    )
                  } else {
                    return highlightedIndex === index
                  }
                }
                return (
                  <div {...getItemProps({ item, index })} key={index}>
                    {renderOption({
                      highlightedIndex,
                      defaultStyles: {
                        backgroundColor: shouldHighlightSelected()
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
                )
              })}
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
                      color: "text",
                      fontWeight: 600,
                    },
                    ...styles?.counterContainer,
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
              ...(state === "loading" ? activeStyles.active : {}),
              ...{
                default: {
                  backgroundColor: hasSpotlight
                    ? "secondary.alpha.90"
                    : "text.alpha.95",
                },
                loading: {},
                success: {
                  backgroundColor: "success.alpha.95",
                  borderColor: "success",
                },
                error: {
                  backgroundColor: "primary.alpha.95",
                  borderColor: "primary",
                },
              }[state],
              "&:hover": {
                ...(state === "default" && {
                  backgroundColor: hasSpotlight
                    ? "secondary.alpha.85"
                    : "text.alpha.90",
                }),
              },
              "&:focus-within": {
                ...(isOpen && activeStyles.active),
              },
              "& *": { transition: "all 0.2s, visibility 0s" },
              ...styles?.inputRoot,
            }}
          >
            {props.multiSelect && (
              <div
                {...inputArias}
                onClick={() => {
                  openMenu()
                }}
                sx={{
                  alignItems: "center",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  width: "100%",
                }}
              >
                {!!props.renderSelectedItems
                  ? props.renderSelectedItems(selectedOption as T[], isOpen)
                  : (selectedOption as T[]).map((option, index) => (
                      <Tag
                        key={`${props.getOptionLabel?.(option)}-${index}`}
                        color={props.tagColor}
                        onRemove={() => props.onRemove?.(option)}
                        showRemove={isOpen && !!props.onRemove}
                      >
                        {props.getOptionLabel?.(option)}
                      </Tag>
                    ))}
                {autocompleteInput}
              </div>
            )}
            {!props.multiSelect && autocompleteInput}
            {(!selectedOption || isOpen) && !props.multiSelect && (
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
            {!isOpen && selectedOption && !props.multiSelect && (
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
                {props.renderSelectedItem
                  ? props.renderSelectedItem(selectedOption as T)
                  : optionToString?.(selectedOption as T)}
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
                color: "success",
                variant: "text.body1",
              },
              error: {
                px: 3,
                pb: 2,
                color: "primary",
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
