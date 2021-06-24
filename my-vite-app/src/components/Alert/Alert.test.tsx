import React from "react"
import { render } from "../../tests/utils"
import { axe } from "jest-axe"
import Alert from "./Alert"
import { theme } from "../../theme/theme"

describe("Alert", () => {
  test("is redered with correct color", () => {
    // Arrange
    const { getByText } = render(
      <Alert position="relative" color="primary" title="Alert">
        The 10-second ECG is ready to be recorded
      </Alert>
    )
    expect(getByText("Alert")).toHaveStyle(
      `background: ${theme.colors?.warning}`
    )
  })

  test("passes a11y check", async () => {
    // Arrange
    const { container } = render(
      <Alert position="relative" color="primary" title="Alert">
        The 10-second ECG is ready to be recorded
      </Alert>
    )
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })
})
