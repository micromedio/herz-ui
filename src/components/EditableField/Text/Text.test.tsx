import React from "react"
import { render, screen } from "../../../tests/utils"
import { axe } from "jest-axe"
import EditableText from "./Text"
import userEvent from "@testing-library/user-event"

describe("EditableText", () => {
  test("value is shown", () => {
    // Arrange
    render(<EditableText value="TEST_VALUE" defaultValue="TEST_VALUE" />)

    // Assert
    expect(screen.getByRole("textbox")).toHaveValue("TEST_VALUE")
  })

  test("input value changes when user types in the input", async () => {
    // Arrange
    render(<EditableText value="TEST_VALUE" defaultValue="TEST_VALUE" />)

    // Act
    userEvent.type(screen.getByRole("textbox"), "_MODIFIED")
    expect(screen.getByRole("textbox")).toHaveValue("TEST_VALUE_MODIFIED")
  })

  test("onSave is called when save button is clicked", async () => {
    // Arrange
    const onSave = jest.fn()
    const onChange = jest.fn()
    render(
      <EditableText
        value="TEST_VALUE_MODIFIED"
        defaultValue="TEST_VALUE"
        onSave={onSave}
        onChange={onChange}
      />
    )

    // Act
    userEvent.click(screen.getByLabelText("save"))

    expect(onSave).toHaveBeenCalledTimes(1)
    expect(onSave).toHaveBeenCalledWith("TEST_VALUE_MODIFIED")
  })

  test("input value is reset when reset button is clicked", async () => {
    // Arrange
    const onChange = jest.fn()
    render(
      <EditableText
        value="TEST_VALUE_MODIFIED"
        defaultValue="TEST_VALUE"
        onChange={onChange}
      />
    )

    // Act
    userEvent.click(screen.getByLabelText("reset"))

    // Assert
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: "TEST_VALUE" }),
      })
    )
  })

  describe("saveOnBlur", () => {
    test("onSave is called when input is unfocused if saveOnBlur is true", async () => {
      // Arrange
      let value = "TEST_VALUE"
      const onSave = jest.fn()
      const onChange = jest.fn()
      const { rerender } = render(
        <EditableText
          value={value}
          defaultValue="TEST_VALUE"
          onSave={onSave}
          onChange={onChange}
          saveOnBlur
        />
      )

      // Act
      value = "TEST_VALUE_MODIFIED"
      rerender(
        <EditableText
          value={value}
          defaultValue="TEST_VALUE"
          onSave={onSave}
          onChange={onChange}
          saveOnBlur
        />
      )
      const input = screen.getByRole("textbox")
      input.focus()
      input.blur()

      // Assert
      expect(onSave).toHaveBeenCalledTimes(1)
      expect(onSave).toHaveBeenCalledWith("TEST_VALUE_MODIFIED")
    })

    test("onSave is not called when input is unfocused if saveOnBlur is false", async () => {
      // Arrange
      let value = "TEST_VALUE"
      const onSave = jest.fn()
      const onChange = jest.fn()
      const { rerender } = render(
        <EditableText
          value={value}
          defaultValue="TEST_VALUE"
          onSave={onSave}
          onChange={onChange}
          saveOnBlur={false}
        />
      )

      // Act
      value = "TEST_VALUE_MODIFIED"
      rerender(
        <EditableText
          value={value}
          defaultValue="TEST_VALUE"
          onSave={onSave}
          onChange={onChange}
          saveOnBlur={false}
        />
      )
      const input = screen.getByRole("textbox")
      input.focus()
      input.blur()

      // Assert
      expect(onSave).not.toHaveBeenCalled()
    })
  })

  describe("resetOnBlur", () => {
    test("input value is reset on blur if resetOnBlur is true", async () => {
      // Arrange
      let value = "TEST_VALUE"
      const onChange = jest.fn()
      const { rerender } = render(
        <EditableText
          value={value}
          defaultValue="TEST_VALUE"
          onChange={onChange}
          resetOnBlur
        />
      )

      // Act
      value = "TEST_VALUE_MODIFIED"
      rerender(
        <EditableText
          value={value}
          defaultValue="TEST_VALUE"
          onChange={onChange}
          resetOnBlur
        />
      )
      const input = screen.getByRole("textbox")
      input.focus()
      input.blur()

      // Assert
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: "TEST_VALUE" }),
        })
      )
    })

    test("input value is not reset on blur if resetOnBlur is false", async () => {
      // Arrange
      let value = "TEST_VALUE"
      const onChange = jest.fn()
      const { rerender } = render(
        <EditableText
          value={value}
          defaultValue="TEST_VALUE"
          onChange={onChange}
          resetOnBlur={false}
        />
      )

      // Act
      value = "TEST_VALUE_MODIFIED"
      rerender(
        <EditableText
          value={value}
          defaultValue="TEST_VALUE"
          onChange={onChange}
          resetOnBlur={false}
        />
      )
      const input = screen.getByRole("textbox")
      input.focus()
      input.blur()

      // Assert
      expect(onChange).not.toHaveBeenCalledWith(
        expect.objectContaining({ target: { value: "TEST_VALUE" } })
      )
    })
  })

  test("passes a11y check", async () => {
    // Arrange
    const { container } = render(
      <EditableText value="TEST_VALUE" defaultValue="TEST_VALUE" />
    )
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })
})
