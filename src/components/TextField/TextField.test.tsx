import React from "react"
import { render } from "@testing-library/react"
import { axe } from "jest-axe"
import TextField from "./TextField"

describe("TextField", () => {
  test("label is shown", async () => {
    // Arrange
    const { getByLabelText } = render(
      <TextField label="TEST_LABEL" id="TEST_ID" />
    )

    // Assert
    expect(getByLabelText("TEST_LABEL")).toBeInTheDocument()
  })

  test("helper text is shown", async () => {
    // Arrange
    const { getByText } = render(<TextField helperText="TEST_HELPER_TEXT" />)

    // Assert
    expect(getByText("TEST_HELPER_TEXT")).toBeInTheDocument()
  })

  test("unit is shown", async () => {
    // Arrange
    const { getByText } = render(<TextField unit="TEST_UNIT" />)

    // Assert
    expect(getByText("TEST_UNIT")).toBeInTheDocument()
  })

  test("input is disabled", async () => {
    // Arrange
    const { getByLabelText } = render(
      <TextField label="INPUT_LABEL" id="TEST_ID" disabled />
    )

    // Assert
    expect(getByLabelText("INPUT_LABEL")).toBeDisabled()
  })

  test("passes a11y check", async () => {
    // Arrange
    const { container } = render(<TextField label="INPUT_LABEL" id="TEST_ID" />)
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })
})
