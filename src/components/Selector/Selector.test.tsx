import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { fireEvent, render } from "../../tests/utils"

import { Selector } from ".."
import { mockedOptions } from "./__mocks__/options"

describe("Selector", () => {
  it("renders successfully", () => {
    const { getByTestId } = render(<Selector options={mockedOptions} />)

    /**
     * Check if the element exists
     */
    expect(getByTestId("dropdown-select")).toBeInTheDocument()
  })

  it("renders the label succesfully", () => {
    const { getByText } = render(
      <Selector label="Select an element:" options={mockedOptions} />
    )

    expect(getByText("Select an element:")).toBeInTheDocument()
  })

  it("renders all the options and allows to select", () => {
    const onChangeMock = jest.fn()
    const { getByText, queryByTitle, getByTestId } = render(
      <Selector onChange={onChangeMock} options={mockedOptions} />
    )

    /** Act: enable the options by clicking on the button */
    const button = getByTestId("dropdown-select-button")
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
    const option = getByText("Tennessine")
    fireEvent.click(option)

    expect(onChangeMock).toHaveBeenCalled()
  })
})
