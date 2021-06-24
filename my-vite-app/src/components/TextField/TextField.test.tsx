import React from "react"
import { render } from "../../tests/utils"
import { axe } from "jest-axe"
import TextField from "./TextField"

describe.each(["Input", "TextArea"])("TextField - %s", (name) => {
  test("should render", async () => {
    // Arrange
    const { getByRole } = render(
      <TextField
        multiline={name === "TextArea"}
        label="INPUT_LABEL"
        id="TEST_ID"
      />
    )

    // Assert
    expect(getByRole("textbox").tagName).toEqual(name.toLocaleUpperCase())
  })

  test("label is shown", async () => {
    // Arrange
    const { getByLabelText } = render(
      <TextField
        multiline={name === "TextArea"}
        label="TEST_LABEL"
        id="TEST_ID"
      />
    )

    // Assert
    expect(getByLabelText("TEST_LABEL")).toBeInTheDocument()
  })

  test("helper text is shown", async () => {
    // Arrange
    const { getByText } = render(
      <TextField
        multiline={name === "TextArea"}
        helperText="TEST_HELPER_TEXT"
      />
    )

    // Assert
    expect(getByText("TEST_HELPER_TEXT")).toBeInTheDocument()
  })

  test("unit is shown", async () => {
    // Arrange
    const { getByText } = render(
      <TextField multiline={name === "TextArea"} unit="TEST_UNIT" />
    )

    // Assert
    expect(getByText("TEST_UNIT")).toBeInTheDocument()
  })

  test("input is disabled", async () => {
    // Arrange
    const { getByLabelText } = render(
      <TextField
        multiline={name === "TextArea"}
        label="INPUT_LABEL"
        id="TEST_ID"
        disabled
      />
    )

    // Assert
    expect(getByLabelText("INPUT_LABEL")).toBeDisabled()
  })

  test("passes a11y check", async () => {
    // Arrange
    const { container } = render(
      <TextField
        multiline={name === "TextArea"}
        label="INPUT_LABEL"
        id="TEST_ID"
      />
    )
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })
})
