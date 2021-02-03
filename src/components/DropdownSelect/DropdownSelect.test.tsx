import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { fireEvent, render } from "@testing-library/react"

import { DropdownSelect } from ".."
import { mockedOptions } from "./__mocks__/options"

describe("DropdownSelect", () => {
  it("renders successfully", () => {
    const { getByTestId } = render(<DropdownSelect options={mockedOptions} />)

    /**
     * Check if the element exists
     */
    getByTestId("dropdown-select")
  })

  it("renders the label succesfully", () => {
    const { getByText } = render(
      <DropdownSelect label="Select an element:" options={mockedOptions} />
    )

    expect(getByText("Select an element:")).toBeInTheDocument()
  })

  it("renders all the options and allows to select", () => {
    const { getByText, queryByTitle, getByTestId } = render(
      <DropdownSelect options={mockedOptions} />
    )

    /** Act: enable the options by clicking on the button */
    const button = getByTestId("dropdown-select-button")
    fireEvent.click(button)

    /**
     * Check if the options are rendered
     */
    mockedOptions.forEach((option) => {
      getByText(option)
    })

    /**
     * Check for an invalid option
     */
    expect(queryByTitle("Random")).toBeNull()

    /** Try to select an option */
    const option = getByText("Tennessine")
    fireEvent.click(option)
  })
})
