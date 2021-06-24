import { axe } from "jest-axe"
import React from "react"
import { render } from "../../tests/utils"
import Highlight from "./Highlight"

describe("Highlight", () => {
  test("It should render with highlighted span", () => {
    // Arrange
    const { getByTestId } = render(
      <Highlight search="name" text="Test highlight name" />
    )

    // Assert
    expect(getByTestId("highlight-wrapper")).toBeTruthy()
    expect(getByTestId("highlight-span")).toBeTruthy()
  })

  test("It should render with highlighted span", () => {
    // Arrange
    const { container, getAllByTestId, getByTestId } = render(
      <Highlight
        search="highlight"
        text="Highlight twice with two times highlight"
      />
    )

    // Assert
    expect(getByTestId("highlight-wrapper")).toBeTruthy()
    expect(getAllByTestId("highlight-span")).toHaveLength(2)
    expect(container.innerHTML).toMatch(
      /<span data-testid=".*"><span data-testid=".*" class=".*">Highlight<\/span> twice with two times <span data-testid=".*" class=".*">highlight<\/span><\/span>/
    )
  })

  test("It should render without highlighted span", async () => {
    // Arrange
    const { container } = render(
      <Highlight search="potato" text="Test highlight name" />
    )

    // Assert
    expect(container.innerHTML).toEqual("Test highlight name")
  })

  test("It should passes a11y check", async () => {
    // Arrange
    const { container } = render(
      <Highlight search="potato" text="Test highlight name" />
    )
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })
})
