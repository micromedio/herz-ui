import React from "react"
import { render, screen } from "../../tests/utils"
import Breadcrumbs from "./Breadcrumbs"
import { axe } from "jest-axe"

describe("Breadcrumbs", () => {
  test("all children are rendered", () => {
    // Arrange
    render(
      <Breadcrumbs>
        <a href="#">Studies</a>
        <a href="#">New Study</a>
        <span>New Patient</span>
      </Breadcrumbs>
    )

    // Assert
    expect(screen.getByRole("link", { name: /studies/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /new study/i })).toBeInTheDocument()
    expect(screen.getByText(/new patient/i)).toBeInTheDocument()
  })

  test("passes a11y check", async () => {
    // Arrange
    const { container } = render(
      <Breadcrumbs>
        <a href="#">Studies</a>
        <a href="#">New Study</a>
        <span>New Patient</span>
      </Breadcrumbs>
    )
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })
})
