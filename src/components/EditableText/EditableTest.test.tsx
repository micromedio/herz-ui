import React from "react"
import { render, screen } from "../../tests/utils"
import { axe } from "jest-axe"
import EditableText from "./EditableText"
import userEvent from "@testing-library/user-event"

describe("EditableText", () => {
  test("value is shown", () => {
    // Arrange
    render(<EditableText value="TEST_VALUE" />)

    // Assert
    expect(screen.getByRole("textbox")).toHaveValue("TEST_VALUE")
  })

  test("onSave is called when save button is clicked", async () => {
    // Arrange
    const onSave = jest.fn()
    render(<EditableText value="TEST_VALUE" onSave={onSave} />)

    // Act
    userEvent.type(screen.getByRole("textbox"), "_MODIFIED")
    userEvent.click(screen.getByLabelText("save"))

    // Assert
    expect(onSave).toHaveBeenCalledTimes(1)
    expect(onSave).toHaveBeenCalledWith("TEST_VALUE_MODIFIED")
  })

  test("input value is reset when reset button is clicked", async () => {
    // Arrange
    render(<EditableText value="TEST_VALUE" />)

    // Act
    const input = screen.getByRole("textbox")

    userEvent.type(input, "_MODIFIED")
    expect(input).toHaveValue("TEST_VALUE_MODIFIED")

    userEvent.click(screen.getByLabelText("reset"))
    expect(input).toHaveValue("TEST_VALUE")
  })

  describe("saveOnBlur", () => {
    test("onSave is called when input is unfocused if saveOnBlur is true", async () => {
      // Arrange
      const onSave = jest.fn()
      render(<EditableText value="TEST_VALUE" onSave={onSave} saveOnBlur />)

      // Act
      const input = screen.getByRole("textbox")
      userEvent.type(input, "_MODIFIED")
      input.blur()

      // Assert
      expect(onSave).toHaveBeenCalledTimes(1)
      expect(onSave).toHaveBeenCalledWith("TEST_VALUE_MODIFIED")
    })

    test("onSave is not called when input is unfocused if saveOnBlur is false", async () => {
      // Arrange
      const onSave = jest.fn()
      render(
        <EditableText value="TEST_VALUE" onSave={onSave} saveOnBlur={false} />
      )

      // Act
      const input = screen.getByRole("textbox")
      userEvent.type(input, "_MODIFIED")
      input.blur()

      // Assert
      expect(onSave).not.toHaveBeenCalled()
    })
  })

  describe("resetOnBlur", () => {
    test("input value is reset on blur if resetOnBlur is true", async () => {
      // Arrange
      render(<EditableText value="TEST_VALUE" resetOnBlur />)

      // Act
      const input = screen.getByRole("textbox")
      userEvent.type(input, "_MODIFIED")
      input.blur()

      // Assert
      expect(input).toHaveValue("TEST_VALUE")
    })

    test("input value is not reset on blur if resetOnBlur is false", async () => {
      // Arrange
      render(<EditableText value="TEST_VALUE" resetOnBlur={false} />)

      // Act
      const input = screen.getByRole("textbox")
      userEvent.type(input, "_MODIFIED")
      input.blur()

      // Assert
      expect(input).toHaveValue("TEST_VALUE_MODIFIED")
    })
  })

  test("passes a11y check", async () => {
    // Arrange
    const { container } = render(<EditableText value="TEST_VALUE" />)
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })
})
