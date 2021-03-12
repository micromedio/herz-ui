import "@testing-library/jest-dom/extend-expect"
import React, { useState } from "react"
import { fireEvent, render } from "../../tests/utils"

import { Selector } from ".."
import { mockedOptions } from "./__mocks__/options"
import { SelectedItems, SelectorProps } from "./Selector"

const ControlledMultiSelectorTemplate = (props: SelectorProps) => {
  const [selectedItems, setSelectedItems] = useState<SelectedItems>([])

  return (
    <Selector
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

describe("Selector", () => {
  it("renders successfully", () => {
    const { getByRole } = render(<Selector options={mockedOptions} />)

    /**
     * Check if the element exists
     */
    expect(
      getByRole("button", { name: "Select an option" })
    ).toBeInTheDocument()
  })

  it("renders the label succesfully", () => {
    const { getByText } = render(
      <Selector label="Select an element:" options={mockedOptions} />
    )

    expect(getByText("Select an element:")).toBeInTheDocument()
  })

  it("renders all the options and allows to select", () => {
    const onChangeMock = jest.fn()
    const { getByText, queryByTitle, getByRole } = render(
      <Selector onChange={onChangeMock} options={mockedOptions} />
    )

    /** Act: enable the options by clicking on the button */
    const button = getByRole("button")
    fireEvent.click(button)

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

    expect(onChangeMock).toHaveBeenCalled()
  })

  describe("onSelectedItemsChange", () => {
    it("allows to add and remove a multi select item", () => {
      const onSelectedItemsChangeMock = jest.fn()

      const { getByText, getByRole } = render(
        <ControlledMultiSelectorTemplate
          onSelectedItemsChange={onSelectedItemsChangeMock}
          options={mockedOptions}
        />
      )

      /** Act: enable the options by clicking on the button */
      const button = getByRole("button")
      fireEvent.click(button)

      /** Try to select an option */
      const option = getByText(mockedOptions[1].label)

      fireEvent.click(option)

      /** Select again to remove it */
      fireEvent.click(option)

      expect(onSelectedItemsChangeMock).toHaveBeenCalledTimes(2)
    })
  })

  describe("handleBulkAction", () => {
    it("allows to user to perform bulk actions to select and deselect items", () => {
      const onSelectedItemsChangeMock = jest.fn()

      const { getByText, getByRole } = render(
        <ControlledMultiSelectorTemplate
          onSelectedItemsChange={onSelectedItemsChangeMock}
          options={mockedOptions}
        />
      )

      /** Act: enable the options by clicking on the button */
      const button = getByRole("button")
      fireEvent.click(button)

      /** Trigger bulk actions */
      const selectAllOption = getByText("Select all")
      fireEvent.click(selectAllOption)

      const deselectAllOptions = getByText("Deselect all")
      fireEvent.click(deselectAllOptions)

      expect(onSelectedItemsChangeMock).toHaveBeenCalledTimes(2)
    })
  })
})
