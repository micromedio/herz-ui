import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { render } from "@testing-library/react"

import Tooltip from "./Tooltip"

describe("Tooltip", () => {
  it("renders successfully", () => {
    const { getByTestId } = render(
      <Tooltip title="Title">
        <button>hover me</button>
      </Tooltip>
    )

    /**
     * Check if the element exists
     */
    expect(getByTestId("tooltip")).toBeInTheDocument()
  })

  it("renders the children succesfully", () => {
    const { getByText } = render(
      <Tooltip title="Title">
        <button>hover me</button>
      </Tooltip>
    )

    expect(getByText("hover me")).toBeInTheDocument()
  })
})
