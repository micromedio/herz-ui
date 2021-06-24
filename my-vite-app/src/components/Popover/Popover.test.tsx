import { render, screen, waitFor } from "../../tests/utils"
import Popover from "./Popover"
import userEvent from "@testing-library/user-event"
import { axe } from "jest-axe"

describe("Popover", () => {
  test("popover shows on hover", async () => {
    render(
      <Popover content="CONTENT_TEXT">
        <div>REFERENCE_ELEMENT</div>
      </Popover>
    )

    expect(screen.queryByText("CONTENT_TEXT")).not.toBeInTheDocument()
    userEvent.hover(screen.getByText("REFERENCE_ELEMENT"))

    await waitFor(() =>
      expect(screen.getByText("CONTENT_TEXT")).toBeInTheDocument()
    )
  })

  test("popover shows on click when trigger is click", async () => {
    render(
      <Popover content="CONTENT_TEXT" trigger={["click"]}>
        <div>REFERENCE_ELEMENT</div>
      </Popover>
    )

    expect(screen.queryByText("CONTENT_TEXT")).not.toBeInTheDocument()
    userEvent.click(screen.getByText("REFERENCE_ELEMENT"))
    await waitFor(() =>
      expect(screen.getByText("CONTENT_TEXT")).toBeInTheDocument()
    )
  })

  test("passes a11y check", async () => {
    // Arrange
    const { container } = render(
      <Popover content="CONTENT_TEXT" isVisible>
        <div>REFERENCE_ELEMENT</div>
      </Popover>
    )
    await waitFor(async () => {
      const results = await axe(container)

      // Assert
      expect(results).toHaveNoViolations()
    })
  })
})
