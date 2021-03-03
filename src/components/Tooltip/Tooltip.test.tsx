import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { render, waitFor } from "../../tests/utils"

import Tooltip from "./Tooltip"

describe("Tooltip", () => {
  it("renders successfully", async () => {
    const { getByTestId } = render(
      <Tooltip title="Title">
        <button>hover me</button>
      </Tooltip>
    )

    /**
     * Check if the element exists
     */

    await waitFor(() => expect(getByTestId("tooltip")).toBeInTheDocument())
  })

  it("renders the children succesfully", async () => {
    const { getByText } = render(
      <Tooltip title="Title">
        <button>hover me</button>
      </Tooltip>
    )

    await waitFor(() => expect(getByText("hover me")).toBeInTheDocument())
  })
})
