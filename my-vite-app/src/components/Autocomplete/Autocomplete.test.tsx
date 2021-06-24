/** @jsxImportSource theme-ui */
import "@testing-library/jest-dom/extend-expect"
import { fireEvent, render, waitFor } from "../../tests/utils"

import { Autocomplete } from ".."
import { mockedOptions } from "./__mocks__/options"
import { useCombobox } from "downshift"

const mockedClientRects = {
  bottom: 619.5,
  height: 265,
  left: 455.578_125,
  right: 783.578_125,
  top: 354.5,
  width: 328,
  x: 455.578_125,
  y: 354.5,
}

type AutocompleteItem = typeof mockedOptions[0]

describe("Autocomplete Single Select", () => {
  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, "getClientRects", {
      configurable: true,
      value: () => [mockedClientRects],
    })
  })

  it("renders single successfully", () => {
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
        selectedOption={[]}
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

  it("should open the menu on input click", async () => {
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

    await waitFor(() => expect(getByRole("listbox")).toBeInTheDocument())
  })

  it("should render all the options and allows to select", async () => {
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
    for (const option of mockedOptions) {
      await waitFor(() => expect(getByText(option.label)).toBeInTheDocument())
    }

    /**
     * Check for an invalid option
     */
    expect(queryByTitle("Random")).not.toBeInTheDocument()

    /** Try to select an option */
    const option = getByText(mockedOptions[1].label)
    fireEvent.click(option)

    expect(onSelectedItemChange).toHaveBeenCalledWith(mockedOptions[1])
  })

  it("should filter options based on input value", async () => {
    const onInputValueChange = jest.fn()
    const { getByRole, findByRole, rerender } = render(
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

    const menuElement = await findByRole("listbox")

    await waitFor(() =>
      expect(onInputValueChange).toHaveBeenCalledWith({
        highlightedIndex: -1,
        inputValue: mockedOptions[0].label,
        isOpen: true,
        selectedItem: null,
        type: useCombobox.stateChangeTypes.InputChange,
      })
    )
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

  it("should render the menu clicking on custom render option div", async () => {
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

    await waitFor(() => expect(queryByRole("listbox")).toBeInTheDocument())
  })

  it("should render the menu clicking on search icon button", async () => {
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

    await waitFor(() => expect(getByRole("listbox")).toBeInTheDocument())
  })

  it("should clear the input when no results are shown", async () => {
    const onInputValueChange = jest.fn()
    const { getByRole, findByRole } = render(
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

    const clearButton = await findByRole("button", { name: /clear/i })
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

describe("Autocomplete Multi Select", () => {
  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, "getClientRects", {
      configurable: true,
      value: () => [mockedClientRects],
    })
  })

  it("renders successfully", () => {
    const { getByPlaceholderText } = render(
      <Autocomplete<AutocompleteItem>
        multiSelect
        onInputValueChange={jest.fn()}
        onSelectedItemsChange={jest.fn()}
        options={mockedOptions}
        placeholder="Search by element's name or symbol"
        renderOption={({ defaultStyles, option }) => (
          <div sx={defaultStyles}>{option.label}</div>
        )}
        selectedOption={[]}
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

  it("renders without placeholder if an option is selected", () => {
    const { getByPlaceholderText } = render(
      <Autocomplete<AutocompleteItem>
        multiSelect
        onInputValueChange={jest.fn()}
        onSelectedItemsChange={jest.fn()}
        options={mockedOptions}
        placeholder="Search by element's name or symbol"
        renderOption={({ defaultStyles, option }) => (
          <div sx={defaultStyles}>{option.label}</div>
        )}
        selectedOption={[mockedOptions[0]]}
        status="success"
        totalCount={mockedOptions.length}
      />
    )

    /**
     * Check if the element exists
     */
    expect(getByPlaceholderText("")).toBeInTheDocument()
  })

  it("should render all the options and allows to select multi", async () => {
    const onSelectedItemsChange = jest.fn()
    const { getByRole, getByText, queryByTitle, rerender } = render(
      <Autocomplete<AutocompleteItem>
        multiSelect
        getOptionLabel={(option) => option.label}
        onInputValueChange={jest.fn()}
        options={mockedOptions}
        renderOption={({ defaultStyles, option }) => (
          <div sx={defaultStyles}>{option.label}</div>
        )}
        onSelectedItemsChange={onSelectedItemsChange}
        placeholder="Search by element's name or symbol"
        selectedOption={[]}
        totalCount={mockedOptions.length}
      />
    )

    /** Act: display the options by clicking on the input */
    const inputElement = getByRole("textbox")
    fireEvent.focus(inputElement)

    /**
     * Check if the options are rendered
     */
    for (const option of mockedOptions) {
      await waitFor(() => expect(getByText(option.label)).toBeInTheDocument())
    }

    /**
     * Check for an invalid option
     */
    expect(queryByTitle("Random")).not.toBeInTheDocument()

    /** Try to select an option */
    const firstOption = getByText(mockedOptions[1].label)
    fireEvent.click(firstOption)

    rerender(
      <Autocomplete<AutocompleteItem>
        multiSelect
        getOptionLabel={(option) => option.label}
        onInputValueChange={jest.fn()}
        options={mockedOptions}
        renderOption={({ defaultStyles, option }) => (
          <div sx={defaultStyles}>{option.label}</div>
        )}
        onSelectedItemsChange={onSelectedItemsChange}
        placeholder="Search by element's name or symbol"
        selectedOption={[mockedOptions[1]]}
        totalCount={mockedOptions.length}
      />
    )

    expect(getByRole("listbox")).toBeInTheDocument()

    /** Try to select another option */
    const secondOption = getByText(mockedOptions[2].label)
    fireEvent.click(secondOption)

    expect(onSelectedItemsChange).toHaveBeenNthCalledWith(1, [mockedOptions[1]])
    expect(onSelectedItemsChange).toHaveBeenNthCalledWith(2, [
      mockedOptions[1],
      mockedOptions[2],
    ])
  })

  it("should deselect an option on click", async () => {
    const onSelectedItemsChange = jest.fn()
    const { getByRole, rerender } = render(
      <Autocomplete<AutocompleteItem>
        multiSelect
        getOptionLabel={(option) => option.label}
        onInputValueChange={jest.fn()}
        options={mockedOptions}
        renderOption={({ defaultStyles, option }) => (
          <div sx={defaultStyles}>{option.label}</div>
        )}
        onSelectedItemsChange={onSelectedItemsChange}
        placeholder="Search by element's name or symbol"
        selectedOption={[mockedOptions[0], mockedOptions[1], mockedOptions[2]]}
        totalCount={mockedOptions.length}
      />
    )

    /** Act: display the options by clicking on the input */
    const inputElement = getByRole("textbox")
    fireEvent.focus(inputElement)

    /** Try to select an option */
    const firstOption = await waitFor(() =>
      getByRole("option", { name: mockedOptions[2].label })
    )
    fireEvent.click(firstOption)

    expect(onSelectedItemsChange).toHaveBeenNthCalledWith(1, [
      mockedOptions[0],
      mockedOptions[1],
    ])

    rerender(
      <Autocomplete<AutocompleteItem>
        multiSelect
        getOptionLabel={(option) => option.label}
        onInputValueChange={jest.fn()}
        options={mockedOptions}
        renderOption={({ defaultStyles, option }) => (
          <div sx={defaultStyles}>{option.label}</div>
        )}
        onSelectedItemsChange={onSelectedItemsChange}
        placeholder="Search by element's name or symbol"
        selectedOption={[mockedOptions[0], mockedOptions[1]]}
        totalCount={mockedOptions.length}
      />
    )

    const secondOption = await waitFor(() =>
      getByRole("option", { name: mockedOptions[0].label })
    )
    fireEvent.click(secondOption)

    expect(onSelectedItemsChange).toHaveBeenNthCalledWith(2, [mockedOptions[1]])
  })

  it("should deselect an option on backspace", async () => {
    const onSelectedItemsChange = jest.fn()
    const { getByRole } = render(
      <Autocomplete<AutocompleteItem>
        multiSelect
        getOptionLabel={(option) => option.label}
        onInputValueChange={jest.fn()}
        options={mockedOptions}
        renderOption={({ defaultStyles, option }) => (
          <div sx={defaultStyles}>{option.label}</div>
        )}
        renderSelectedItems={(options) => {
          return options.map((option) => (
            <span key={option.value}>
              {option.label}{" "}
              <strong>
                <sup sx={{ position: "relative", left: 3, top: "-5px" }}>
                  {option.A}
                </sup>
                <sub
                  sx={{
                    position: "relative",
                    top: "5px",
                  }}
                >
                  {option.Z}
                </sub>
                {option.symbol}
              </strong>
            </span>
          ))
        }}
        onSelectedItemsChange={onSelectedItemsChange}
        placeholder="Search by element's name or symbol"
        selectedOption={[mockedOptions[0], mockedOptions[1]]}
        totalCount={mockedOptions.length}
      />
    )

    /** Act: display the options by clicking on the input */
    const inputElement = getByRole("textbox")
    fireEvent.focus(inputElement)
    await waitFor(() => fireEvent.keyDown(inputElement, { key: `Backspace` }))

    expect(onSelectedItemsChange).toHaveBeenCalledWith([mockedOptions[0]])
  })

  it("should trigger onRemove when clicked", async () => {
    const onRemove = jest.fn()
    const { getAllByRole, getByRole } = render(
      <Autocomplete<AutocompleteItem>
        multiSelect
        getOptionLabel={(option) => option.label}
        onInputValueChange={jest.fn()}
        options={mockedOptions}
        renderOption={({ defaultStyles, option }) => (
          <div sx={defaultStyles}>{option.label}</div>
        )}
        onRemove={onRemove}
        onSelectedItemsChange={jest.fn()}
        placeholder="Search by element's name or symbol"
        selectedOption={[mockedOptions[0]]}
        totalCount={mockedOptions.length}
      />
    )

    /** Act: display the options by clicking on the input */
    const inputElement = getByRole("textbox")
    fireEvent.focus(inputElement)

    const tagElements = await waitFor(() => getAllByRole("button"))
    fireEvent.click(tagElements[0])

    expect(onRemove).toHaveBeenCalledWith(mockedOptions[0])
  })

  it("should clear the search on blur", async () => {
    const { getByRole } = render(
      <Autocomplete<AutocompleteItem>
        multiSelect
        getOptionLabel={(option) => option.label}
        onInputValueChange={jest.fn()}
        options={mockedOptions}
        renderOption={({ defaultStyles, option }) => (
          <div sx={defaultStyles}>{option.label}</div>
        )}
        onSelectedItemsChange={jest.fn()}
        placeholder="Search by element's name or symbol"
        selectedOption={[mockedOptions[0], mockedOptions[1]]}
        totalCount={mockedOptions.length}
      />
    )

    /** Act: display the options by clicking on the input */
    const inputElement = getByRole("textbox")
    fireEvent.focus(inputElement)
    fireEvent.change(inputElement, { target: { value: `Ne` } })

    expect((inputElement as HTMLInputElement).value).toEqual(`Ne`)

    fireEvent.blur(inputElement)

    expect((inputElement as HTMLInputElement).value).toEqual("")
  })

  it("should clear the search on select", async () => {
    const { getByRole } = render(
      <Autocomplete<AutocompleteItem>
        multiSelect
        getOptionLabel={(option) => option.label}
        onInputValueChange={jest.fn()}
        options={mockedOptions}
        renderOption={({ defaultStyles, option }) => (
          <div sx={defaultStyles}>{option.label}</div>
        )}
        onSelectedItemsChange={jest.fn()}
        placeholder="Search by element's name or symbol"
        selectedOption={[mockedOptions[0], mockedOptions[1]]}
        totalCount={mockedOptions.length}
      />
    )

    /** Act: display the options by clicking on the input */
    const inputElement = getByRole("textbox")
    fireEvent.focus(inputElement)
    fireEvent.change(inputElement, { target: { value: `Ne` } })

    expect((inputElement as HTMLInputElement).value).toEqual(`Ne`)

    /** Try to deselect an option */
    const firstOption = await waitFor(() =>
      getByRole("option", { name: mockedOptions[0].label })
    )
    fireEvent.click(firstOption)

    expect((inputElement as HTMLInputElement).value).toEqual("")
  })

  it("should not clear the search on select", async () => {
    const { getByRole } = render(
      <Autocomplete<AutocompleteItem>
        keepSearchAfterSelect
        multiSelect
        getOptionLabel={(option) => option.label}
        onInputValueChange={jest.fn()}
        options={mockedOptions}
        renderOption={({ defaultStyles, option }) => (
          <div sx={defaultStyles}>{option.label}</div>
        )}
        onSelectedItemsChange={jest.fn()}
        placeholder="Search by element's name or symbol"
        selectedOption={[mockedOptions[0], mockedOptions[1]]}
        totalCount={mockedOptions.length}
      />
    )

    /** Act: display the options by clicking on the input */
    const inputElement = getByRole("textbox")
    fireEvent.focus(inputElement)
    fireEvent.change(inputElement, { target: { value: `Ne` } })

    expect((inputElement as HTMLInputElement).value).toEqual(`Ne`)

    /** Try to deselect an option */
    const firstOption = await waitFor(() =>
      getByRole("option", { name: mockedOptions[0].label })
    )
    fireEvent.click(firstOption)

    expect((inputElement as HTMLInputElement).value).toEqual(`Ne`)
  })
})
