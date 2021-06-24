import { render, screen } from "../../tests/utils"
import { axe } from "jest-axe"
import Tag from "./Tag"

describe("Tag", () => {
  test("tag text is shown", async () => {
    // Arrange
    render(<Tag>TAG_TEXT</Tag>)

    // Assert
    expect(screen.getByText("TAG_TEXT")).toBeInTheDocument()
  })

  test("onRemove is called when X button is clicked", async () => {
    // Arrange
    const onRemove = jest.fn()
    render(
      <Tag showRemove onRemove={onRemove}>
        TAG_TEXT
      </Tag>
    )
    const removeButton = screen.getByRole("button", { name: "remove" })

    // Assert
    expect(onRemove).not.toHaveBeenCalled()
    removeButton.click()
    expect(onRemove).toHaveBeenCalled()
  })

  test("passes a11y check", async () => {
    // Arrange
    const { container } = render(<Tag>TAG_TEXT</Tag>)
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })
})
