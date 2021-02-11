import React from "react"
import { cleanup, fireEvent, render } from "@testing-library/react"
import Button from "./Button"

afterEach(cleanup)

describe("Button", () => {
  test("children is Shown", async () => {
    // Arrange
    const { getByText } = render(<Button id="TEST_ID">Standard Value</Button>)

    // Assert
    expect(getByText(/^standard value$/i)).toBeInTheDocument()
  })

  test("onClick is called", async () => {
    // Arrange
    const onClick = jest.fn()
    const { getByText } = render(<Button onClick={onClick}>Submit</Button>)

    fireEvent.click(getByText(/^submit$/i))

    // Assert
    expect(onClick).toHaveBeenCalled()
  })

  test("onClick is not called when disabled", async () => {
    // Arrange
    const onClick = jest.fn()
    const { getByText } = render(
      <Button onClick={onClick} disabled>
        Submit
      </Button>
    )

    fireEvent.click(getByText(/^submit$/i))

    expect(onClick).not.toHaveBeenCalled()
  })
})
