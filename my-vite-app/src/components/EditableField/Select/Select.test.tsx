import React from "react"
import { render, screen } from "../../../tests/utils"
import { axe } from "jest-axe"
import EditableSelect from "./Select"
import userEvent from "@testing-library/user-event"

describe("EditableText", () => {
  const options = [
    <EditableSelect.Option key="TEST_VALUE" value="TEST_VALUE">
      TEST_VALUE
    </EditableSelect.Option>,
    <EditableSelect.Option key="ANOTHER_TEST_VALUE" value="ANOTHER_TEST_VALUE">
      ANOTHER_TEST_VALUE
    </EditableSelect.Option>,
  ]

  test("value is shown", () => {
    // Arrange
    render(
      <EditableSelect value="TEST_VALUE" defaultValue="TEST_VALUE">
        {options}
      </EditableSelect>
    )

    // Assert
    const button = screen.getByRole("button", { name: "TEST_VALUE" })
    expect(button).toBeInTheDocument()
  })

  test("onSave is called when save button is clicked", async () => {
    // Arrange
    const onSave = jest.fn()
    const onChange = jest.fn()
    render(
      <EditableSelect
        value="TEST_VALUE_MODIFIED"
        defaultValue="TEST_VALUE"
        onSave={onSave}
        onChange={onChange}
      >
        {options}
      </EditableSelect>
    )

    // Act
    expect(onSave).not.toHaveBeenCalled()
    userEvent.click(screen.getByLabelText("save"))

    expect(onSave).toHaveBeenCalledTimes(1)
    expect(onSave).toHaveBeenCalledWith("TEST_VALUE_MODIFIED")
  })

  test("select value is reset when reset button is clicked", async () => {
    // Arrange
    const onChange = jest.fn()
    render(
      <EditableSelect
        value="TEST_VALUE_MODIFIED"
        defaultValue="TEST_VALUE"
        onChange={onChange}
      >
        {options}
      </EditableSelect>
    )

    // Act
    userEvent.click(screen.getByLabelText("reset"))

    // Assert
    expect(onChange).toHaveBeenCalledWith("TEST_VALUE")
  })

  describe("saveOnBlur", () => {
    test("onSave is called when select is unfocused if saveOnBlur is true", async () => {
      // Arrange
      const onSave = jest.fn()
      const onChange = jest.fn()

      render(
        <EditableSelect
          value="ANOTHER_TEST_VALUE"
          defaultValue="TEST_VALUE"
          onSave={onSave}
          onChange={onChange}
          saveOnBlur
          resetOnBlur={false}
        >
          {options}
        </EditableSelect>
      )

      // Act
      const select = screen.getByRole("button", { name: "ANOTHER_TEST_VALUE" })
      select.focus()
      select.blur()

      // Assert
      expect(onSave).toHaveBeenCalledTimes(1)
      expect(onSave).toHaveBeenCalledWith("ANOTHER_TEST_VALUE")
    })

    test("onSave is not called when select is unfocused if saveOnBlur is false", async () => {
      // Arrange
      const onSave = jest.fn()
      const onChange = jest.fn()
      render(
        <EditableSelect
          value="ANOTHER_TEST_VALUE"
          defaultValue="TEST_VALUE"
          onSave={onSave}
          onChange={onChange}
          saveOnBlur={false}
          resetOnBlur={false}
        >
          {options}
        </EditableSelect>
      )

      // Act
      const select = screen.getByRole("button", { name: "ANOTHER_TEST_VALUE" })
      select.focus()
      select.blur()

      // Assert
      expect(onSave).not.toHaveBeenCalled()
    })
  })

  describe("resetOnBlur", () => {
    test("select value is reset on blur if resetOnBlur is true", async () => {
      // Arrange
      const onSave = jest.fn()
      const onChange = jest.fn()
      render(
        <EditableSelect
          value="ANOTHER_TEST_VALUE"
          defaultValue="TEST_VALUE"
          onSave={onSave}
          onChange={onChange}
          saveOnBlur={false}
          resetOnBlur
        >
          {options}
        </EditableSelect>
      )

      // Act
      const select = screen.getByRole("button", { name: "ANOTHER_TEST_VALUE" })
      select.focus()
      select.blur()

      // Assert
      expect(onChange).toHaveBeenCalledWith("TEST_VALUE")
    })

    test("select value is not reset on blur if resetOnBlur is false", async () => {
      // Arrange
      const onSave = jest.fn()
      const onChange = jest.fn()
      render(
        <EditableSelect
          value="ANOTHER_TEST_VALUE"
          defaultValue="TEST_VALUE"
          onSave={onSave}
          onChange={onChange}
          saveOnBlur={false}
          resetOnBlur={false}
        >
          {options}
        </EditableSelect>
      )

      // Act
      const select = screen.getByRole("button", { name: "ANOTHER_TEST_VALUE" })
      select.focus()
      select.blur()

      // Assert
      expect(onChange).not.toHaveBeenCalled()
    })
  })

  test("passes a11y check", async () => {
    // Arrange
    const { container } = render(
      <EditableSelect value="TEST_VALUE" defaultValue="TEST_VALUE">
        {options}
      </EditableSelect>
    )
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })
})
