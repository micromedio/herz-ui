import React from "react"
import { fireEvent, render } from "../../tests/utils"
import { axe } from "jest-axe"
import SubNavigationMenu from "./SubNavigationMenu"

describe("Alert", () => {
  test("should render with two anchors", () => {
    // Arrange
    const { getAllByRole } = render(
      <SubNavigationMenu>
        {["License types", "Licenses"].map((item, index) => (
          <SubNavigationMenu.MenuItem
            key={item}
            label={item}
            selected={index === 0}
          />
        ))}
      </SubNavigationMenu>
    )
    expect(getAllByRole("listitem")).toHaveLength(2)
  })

  test("should collapse on button click", () => {
    // Arrange
    const { getByRole } = render(
      <SubNavigationMenu>
        {["License types", "Licenses"].map((item, index) => (
          <SubNavigationMenu.MenuItem
            key={item}
            label={item}
            selected={index === 0}
          />
        ))}
      </SubNavigationMenu>
    )
    const collapsibleButton = getByRole("button")
    fireEvent.click(collapsibleButton)
    const navigation = getByRole("navigation")
    expect(
      window.getComputedStyle(navigation.firstChild as HTMLUListElement).width
    ).toEqual("84px")
  })

  test("should expand on button click", () => {
    // Arrange
    const { getByRole } = render(
      <SubNavigationMenu>
        {["License types", "Licenses"].map((item, index) => (
          <SubNavigationMenu.MenuItem
            key={item}
            label={item}
            selected={index === 0}
          />
        ))}
      </SubNavigationMenu>
    )
    const collapsibleButton = getByRole("button")
    fireEvent.click(collapsibleButton)
    fireEvent.click(collapsibleButton)
    const navigation = getByRole("navigation")
    expect(
      window.getComputedStyle(navigation.firstChild as HTMLUListElement).width
    ).toEqual("164px")
  })

  test("should collapse hidden", () => {
    // Arrange
    const { getByRole } = render(
      <SubNavigationMenu collapsedHidden>
        {["License types", "Licenses"].map((item, index) => (
          <SubNavigationMenu.MenuItem
            key={item}
            label={item}
            selected={index === 0}
          />
        ))}
      </SubNavigationMenu>
    )
    const collapsibleButton = getByRole("button")
    fireEvent.click(collapsibleButton)
    const navigation = getByRole("navigation")
    expect(navigation.firstChild).not.toBeVisible()
  })

  test("should not be collapsible", () => {
    // Arrange
    const { queryByRole } = render(
      <SubNavigationMenu collapsible={false}>
        {["License types", "Licenses"].map((item, index) => (
          <SubNavigationMenu.MenuItem
            key={item}
            label={item}
            selected={index === 0}
          />
        ))}
      </SubNavigationMenu>
    )
    const collapsibleButton = queryByRole("button")
    expect(collapsibleButton).not.toBeInTheDocument()
  })

  test("passes a11y check", async () => {
    // Arrange
    const { container } = render(
      <SubNavigationMenu>
        {["License types", "Licenses"].map((item, index) => (
          <SubNavigationMenu.MenuItem
            key={item}
            label={item}
            selected={index === 0}
          />
        ))}
      </SubNavigationMenu>
    )
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })
})
