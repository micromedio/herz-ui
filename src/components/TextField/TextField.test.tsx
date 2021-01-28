import { render, screen } from "@testing-library/react"
import TextField from "./TextField"

describe("TextField", () => {
  test("label is shown", async () => {
    // Arrange
    render(<TextField label="TEST_LABEL" id="TEST_ID" />)

    // Assert
    expect(screen.getByLabelText("TEST_LABEL")).toBeTruthy()
  })

  test("helper text is shown", async () => {
    // Arrange
    render(<TextField helperText="TEST_HELPER_TEXT" />)

    // Assert
    expect(screen.getByText("TEST_HELPER_TEXT")).toBeTruthy()
  })

  test("unit is shown", async () => {
    // Arrange
    render(<TextField unit="TEST_UNIT" />)

    // Assert
    expect(screen.getByText("TEST_UNIT")).toBeTruthy()
  })

  test("input is disabled", async () => {
    // Arrange
    render(<TextField label="INPUT_LABEL" id="TEST_ID" disabled />)

    // Assert
    expect(screen.getByLabelText("INPUT_LABEL")).toBeDisabled()
  })
})
