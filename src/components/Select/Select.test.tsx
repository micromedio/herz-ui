import { useState } from "react"
import { fireEvent, render, waitFor } from "../../tests/utils"

import { mockedOptions } from "./__mocks__/options"
import Select, { SelectProps } from "./Select"
const children = mockedOptions.map(({ label, value }) => (
  <Select.Option key={value} value={value}>
    {label}
  </Select.Option>
))

const ControlledMultiSelectTemplate = (props: SelectProps) => {
  const [selectedItems, setSelectedItems] = useState<
    SelectProps["selectedItems"]
  >([])

  return (
    <Select
      selectedItems={selectedItems}
      multi={true}
      {...props}
      onSelectedItemsChange={(selectedItems) => {
        setSelectedItems(selectedItems)
        props.onSelectedItemsChange?.(selectedItems)
      }}
    />
  )
}

describe("Select", () => {
  it("renders successfully", () => {
    const { getByRole } = render(<Select>{children}</Select>)

    /**
     * Check if the element exists
     */
    expect(
      getByRole("button", { name: "Select an option" })
    ).toBeInTheDocument()
  })

  it("renders the label succesfully", () => {
    const { getByText } = render(
      <Select label="Select an element:">{children}</Select>
    )

    expect(getByText("Select an element:")).toBeInTheDocument()
  })

  it("renders all the options and allows to select", async () => {
    const onChangeMock = jest.fn()
    const { getByText, queryByTitle, getByRole } = render(
      <Select onChange={onChangeMock}>{children}</Select>
    )

    /** Act: enable the options by clicking on the button */
    const button = getByRole("button")
    fireEvent.click(button)

    /**
     * Check if the options are rendered
     */
    await waitFor(() =>
      mockedOptions.forEach((option) => {
        expect(getByText(option.label)).toBeInTheDocument()
      })
    )
    /**
     * Check for an invalid option
     */
    expect(queryByTitle("Random")).not.toBeInTheDocument()

    /** Try to select an option */
    const option = getByText(mockedOptions[1].label)
    fireEvent.click(option)

    expect(onChangeMock).toHaveBeenCalled()
  })

  describe("onSelectedItemsChange", () => {
    it("allows to add and remove a multi select item", async () => {
      const onSelectedItemsChangeMock = jest.fn()

      const { findByText, getByRole } = render(
        <ControlledMultiSelectTemplate
          onSelectedItemsChange={onSelectedItemsChangeMock}
        >
          {children}
        </ControlledMultiSelectTemplate>
      )

      /** Act: enable the options by clicking on the button */
      const button = getByRole("button")
      fireEvent.click(button)

      /** Try to select an option */
      const option = await findByText(mockedOptions[1].label)

      fireEvent.click(option)

      /** Select again to remove it */
      fireEvent.click(option)

      expect(onSelectedItemsChangeMock).toHaveBeenCalledTimes(2)
    })
  })

  describe("handleBulkAction", () => {
    it("allows to user to perform bulk actions to select and deselect items", async () => {
      const onSelectedItemsChangeMock = jest.fn()

      const { getByText, findByText, getByRole } = render(
        <ControlledMultiSelectTemplate
          onSelectedItemsChange={onSelectedItemsChangeMock}
        >
          {children}
        </ControlledMultiSelectTemplate>
      )

      /** Act: enable the options by clicking on the button */
      const button = getByRole("button")
      fireEvent.click(button)

      /** Trigger bulk actions */
      const selectAllOption = await findByText("Select all")
      fireEvent.click(selectAllOption)

      const deselectAllOptions = getByText("Deselect all")
      fireEvent.click(deselectAllOptions)

      expect(onSelectedItemsChangeMock).toHaveBeenCalledTimes(2)
    })
  })
})
