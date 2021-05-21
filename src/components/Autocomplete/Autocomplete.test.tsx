import "@testing-library/jest-dom/extend-expect"
import { fireEvent, render } from "../../tests/utils"

import { Autocomplete } from ".."
import { mockedOptions } from "./__mocks__/options"
import { useCombobox } from "downshift"

const mockedClientRects = {
  bottom: 619.5,
  height: 265,
  left: 455.578125,
  right: 783.578125,
  top: 354.5,
  width: 328,
  x: 455.578125,
  y: 354.5,
}

type AutocompleteItem = typeof mockedOptions[0]

describe("Autocomplete", () => {
  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, "getClientRects", {
      configurable: true,
      value: () => [mockedClientRects],
    })
  })

  it("renders successfully", () => {
    const { getByPlaceholderText } = render(
      <Autocomplete<AutocompleteItem>
        onInputValueChange={jest.fn()}
        onSelectedItemChange={jest.fn()}
        options={mockedOptions}
        optionToString={(option) => (option ? option.label : "")}
        placeholder="Search by element's name or symbol"
        renderOption={({ defaultStyles, option }) => (
          <div sx={defaultStyles}>{option.label}</div>
        )}
        selectedOption={null}
        status="success"
        totalCount={mockedOptions.length}
      />
    )

    /**
     * Check if the element exists
     */
    expect(
      getByPlaceholderText("Search by element's name or symbol")
    ).toBeInTheDocument()
  })

  it("should open the menu on input click", () => {
    const { getByRole, queryByRole } = render(
      <Autocomplete<AutocompleteItem>
        onInputValueChange={jest.fn()}
        onSelectedItemChange={jest.fn()}
        options={mockedOptions}
        optionToString={(option) => (option ? option.label : "")}
        placeholder="Search by element's name or symbol"
        renderOption={({ defaultStyles, option }) => (
          <div sx={defaultStyles}>{option.label}</div>
        )}
        selectedOption={null}
        status="loading"
      />
    )
    expect(queryByRole("listbox")).not.toBeInTheDocument()

    const inputElement = getByRole("textbox")
    fireEvent.focus(inputElement)

    expect(getByRole("listbox")).toBeInTheDocument()
  })

  it("should renders all the options and allows to select", () => {
    const onSelectedItemChange = jest.fn()
    const { getByRole, getByText, queryByTitle } = render(
      <Autocomplete<AutocompleteItem>
        onInputValueChange={jest.fn()}
        options={mockedOptions}
        optionToString={(option) => (option ? option.label : "")}
        renderOption={({ defaultStyles, option }) => (
          <div sx={defaultStyles}>{option.label}</div>
        )}
        renderSelectedItem={(selectedOption) => {
          return (
            <span>
              {selectedOption.label} - {selectedOption.value}
            </span>
          )
        }}
        onSelectedItemChange={onSelectedItemChange}
        placeholder="Search by element's name or symbol"
        selectedOption={null}
        totalCount={mockedOptions.length}
      />
    )

    /** Act: display the options by clicking on the input */
    const inputElement = getByRole("textbox")
    fireEvent.focus(inputElement)

    /**
     * Check if the options are rendered
     */
    mockedOptions.forEach((option) => {
      expect(getByText(option.label)).toBeInTheDocument()
    })

    /**
     * Check for an invalid option
     */
    expect(queryByTitle("Random")).not.toBeInTheDocument()

    /** Try to select an option */
    const option = getByText(mockedOptions[1].label)
    fireEvent.click(option)

    expect(onSelectedItemChange).toHaveBeenCalledWith({
      highlightedIndex: -1,
      inputValue: mockedOptions[1].label,
      isOpen: false,
      selectedItem: mockedOptions[1],
      type: useCombobox.stateChangeTypes.ItemClick,
    })
  })

  it("should filter options based on input value", () => {
    const onInputValueChange = jest.fn()
    const { getByRole, rerender } = render(
      <Autocomplete<AutocompleteItem>
        onInputValueChange={onInputValueChange}
        onSelectedItemChange={jest.fn()}
        options={mockedOptions.slice(0, 5)}
        optionToString={(option) => (option ? option.label : "")}
        renderOption={({ defaultStyles, option }) => (
          <div sx={defaultStyles}>{option.label}</div>
        )}
        renderSelectedItem={(selectedOption) => {
          return (
            <span>
              {selectedOption.label} - {selectedOption.value}
            </span>
          )
        }}
        placeholder="Search by element's name or symbol"
        selectedOption={null}
      />
    )

    rerender(
      <Autocomplete<AutocompleteItem>
        onInputValueChange={onInputValueChange}
        onSelectedItemChange={jest.fn()}
        options={[mockedOptions[0]]}
        optionToString={(option) => (option ? option.label : "")}
        renderOption={({ defaultStyles, option }) => (
          <div sx={defaultStyles}>{option.label}</div>
        )}
        renderSelectedItem={(selectedOption) => {
          return (
            <span>
              {selectedOption.label} - {selectedOption.value}
            </span>
          )
        }}
        placeholder="Search by element's name or symbol"
        selectedOption={null}
      />
    )

    /** Act: display the options by clicking on the input */
    const inputElement = getByRole("textbox")
    fireEvent.click(inputElement)
    fireEvent.change(inputElement, {
      target: { value: mockedOptions[0].label },
    })

    const menuElement = getByRole("listbox")

    expect(onInputValueChange).toHaveBeenCalledWith({
      highlightedIndex: -1,
      inputValue: mockedOptions[0].label,
      isOpen: true,
      selectedItem: null,
      type: useCombobox.stateChangeTypes.InputChange,
    })
    expect(menuElement.children).toHaveLength(1)
  })

  it("should render a customized option and hide the input", () => {
    const { getByPlaceholderText, getByText, rerender } = render(
      <Autocomplete<AutocompleteItem>
        buttons={[
          {
            color: "secondary",
            children: "Clear",
            onClick: jest.fn(),
            variant: "plain",
          },
        ]}
        onInputValueChange={jest.fn()}
        onSelectedItemChange={jest.fn()}
        options={mockedOptions.slice(0, 5)}
        optionToString={(option) => (option ? option.label : "")}
        ref={{ current: null }}
        renderOption={({ defaultStyles, option }) => (
          <div sx={defaultStyles}>{option.label}</div>
        )}
        placeholder="Search by element's name or symbol"
        selectedOption={null}
        totalCount={mockedOptions.length}
      />
    )

    rerender(
      <Autocomplete<AutocompleteItem>
        buttons={[
          {
            color: "secondary",
            children: "Clear",
            onClick: jest.fn(),
            variant: "plain",
          },
        ]}
        onInputValueChange={jest.fn()}
        onSelectedItemChange={jest.fn()}
        options={mockedOptions.slice(0, 5)}
        optionToString={(option) => (option ? option.label : "")}
        ref={{ current: null }}
        renderOption={({ defaultStyles, option }) => (
          <div sx={defaultStyles}>{option.label}</div>
        )}
        placeholder="Search by element's name or symbol"
        selectedOption={mockedOptions[0]}
        totalCount={mockedOptions.length}
      />
    )

    const customRenderedOption = getByText(mockedOptions[0].label)
    const inputElement = getByPlaceholderText(
      "Search by element's name or symbol"
    )

    expect(inputElement).not.toBeVisible()
    expect(customRenderedOption).toBeVisible()
  })

  it("should render the menu clicking on custom render option div", () => {
    const { getByText, queryByRole, rerender } = render(
      <Autocomplete<AutocompleteItem>
        onInputValueChange={jest.fn()}
        onSelectedItemChange={jest.fn()}
        options={mockedOptions.slice(0, 5)}
        optionToString={(option) => (option ? option.label : "")}
        ref={{ current: null }}
        renderOption={({ defaultStyles, option }) => (
          <div sx={defaultStyles}>{option.label}</div>
        )}
        renderSelectedItem={(selectedOption) => {
          return (
            <span>
              {selectedOption.label} - {selectedOption.value}
            </span>
          )
        }}
        placeholder="Search by element's name or symbol"
        selectedOption={null}
        totalCount={mockedOptions.length}
      />
    )

    rerender(
      <Autocomplete<AutocompleteItem>
        onInputValueChange={jest.fn()}
        onSelectedItemChange={jest.fn()}
        options={mockedOptions.slice(0, 5)}
        optionToString={(option) => (option ? option.label : "")}
        ref={{ current: null }}
        renderOption={({ defaultStyles, option }) => (
          <div sx={defaultStyles}>{option.label}</div>
        )}
        renderSelectedItem={(selectedOption) => {
          return (
            <span>
              {selectedOption.label} - {selectedOption.value}
            </span>
          )
        }}
        placeholder="Search by element's name or symbol"
        selectedOption={mockedOptions[0]}
        totalCount={mockedOptions.length}
      />
    )

    expect(queryByRole("listbox")).not.toBeInTheDocument()

    const customRenderedOption = getByText(
      `${mockedOptions[0].label} - ${mockedOptions[0].value}`
    ).parentElement as HTMLDivElement
    fireEvent.click(customRenderedOption)

    expect(queryByRole("listbox")).toBeInTheDocument()
  })

  it("should render the menu clicking on search icon button", () => {
    const { getByRole, queryByRole } = render(
      <Autocomplete<AutocompleteItem>
        helperText="This is a helper text"
        label="Label"
        onInputValueChange={jest.fn()}
        onSelectedItemChange={jest.fn()}
        options={mockedOptions.slice(0, 5)}
        optionToString={(option) => (option ? option.label : "")}
        placeholder="Search by element's name or symbol"
        ref={{ current: null }}
        renderOption={({ defaultStyles, option }) => (
          <div sx={defaultStyles}>{option.label}</div>
        )}
        renderSelectedItem={(selectedOption) => {
          return (
            <span>
              {selectedOption.label} - {selectedOption.value}
            </span>
          )
        }}
        required
        requiredText="required"
        selectedOption={null}
        totalCount={mockedOptions.length}
      />
    )

    expect(queryByRole("listbox")).not.toBeInTheDocument()

    const searchButton = getByRole("button", { name: /label/i })
    fireEvent.click(searchButton)

    expect(getByRole("listbox")).toBeInTheDocument()
  })

  it("should clear the input when no results are shown", () => {
    const onInputValueChange = jest.fn()
    const { getByRole } = render(
      <Autocomplete<AutocompleteItem>
        label="Label"
        optionalText="optional"
        onInputValueChange={onInputValueChange}
        onSelectedItemChange={jest.fn()}
        options={[]}
        optionToString={(option) => (option ? option.label : "")}
        ref={{ current: null }}
        renderOption={({ defaultStyles, option }) => (
          <div sx={defaultStyles}>{option.label}</div>
        )}
        renderSelectedItem={(selectedOption) => {
          return (
            <span>
              {selectedOption.label} - {selectedOption.value}
            </span>
          )
        }}
        selectedOption={null}
        status="error"
      />
    )

    const customInputValue = "Custom value"

    const inputElement = getByRole("textbox")
    fireEvent.click(inputElement)
    fireEvent.change(inputElement, { target: { value: customInputValue } })

    expect(onInputValueChange).toHaveBeenCalledWith({
      highlightedIndex: -1,
      inputValue: customInputValue,
      isOpen: true,
      selectedItem: null,
      type: useCombobox.stateChangeTypes.InputChange,
    })

    const clearButton = getByRole("button", { name: /clear/i })
    fireEvent.click(clearButton)

    expect(onInputValueChange).toHaveBeenLastCalledWith({
      highlightedIndex: -1,
      inputValue: "",
      isOpen: true,
      selectedItem: null,
      type: useCombobox.stateChangeTypes.FunctionSetInputValue,
    })
  })
})
