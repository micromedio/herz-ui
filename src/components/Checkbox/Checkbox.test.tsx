import "@testing-library/jest-dom/extend-expect"
import React, { useState } from "react"
import { act, fireEvent, render } from "@testing-library/react"

import Checkbox, { ICheckboxProps } from "./Checkbox"

const CheckboxTemplate = (props: ICheckboxProps) => {
  const [checked, setChecked] = useState(false)

  return (
    <Checkbox
      checked={checked}
      onChange={() => setChecked((previous) => !previous)}
      {...props}
    />
  )
}

describe("Checkbox", () => {
  it("can be checked", () => {
    const mockedFunction = jest.fn()
    const { getByTestId } = render(
      <CheckboxTemplate onChange={mockedFunction} />
    )

    const checkbox = getByTestId("checkbox")

    expect(checkbox).toBeInTheDocument()

    fireEvent.click(checkbox)

    expect(mockedFunction).toHaveBeenCalled()
  })

  it("renders the label succesfully", () => {
    const label = "Check me"
    const { getByText } = render(<CheckboxTemplate label={label} />)

    expect(getByText(label)).toBeInTheDocument()
  })

  it("can be disabled", () => {
    const mockedFunction = jest.fn()
    const { getByTestId } = render(
      <CheckboxTemplate disabled={true} onChange={() => mockedFunction()} />
    )

    const checkbox = getByTestId("checkbox")

    fireEvent.click(checkbox)

    expect(mockedFunction).not.toHaveBeenCalled()
  })
})
