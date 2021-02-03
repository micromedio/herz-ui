import React from "react"
import { render } from "@testing-library/react"
import { axe } from "jest-axe"
import Pagination from "./Pagination"

describe("Pagination", () => {
  test("passes a11y check", async () => {
    // Arrange
    const { container } = render(<Pagination page={1} count={20} />)
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })

  test("current page shows on screen", async () => {
    // Arrange
    const { getByText } = render(<Pagination page={21} count={50} />)

    // Assert
    expect(getByText("21")).toBeInTheDocument()
  })

  test("pages far from the current page are hidden", async () => {
    // Arrange
    const { queryByText } = render(
      <Pagination page={21} count={50} boundaryCount={3} siblingCount={1} />
    )

    // Assert
    expect(queryByText("17")).not.toBeInTheDocument()
    expect(queryByText("18")).not.toBeInTheDocument()
    expect(queryByText("19")).not.toBeInTheDocument()
    expect(queryByText("20")).toBeInTheDocument()
    expect(queryByText("21")).toBeInTheDocument()
    expect(queryByText("22")).toBeInTheDocument()
    expect(queryByText("23")).not.toBeInTheDocument()
    expect(queryByText("24")).not.toBeInTheDocument()
    expect(queryByText("25")).not.toBeInTheDocument()
  })
})
