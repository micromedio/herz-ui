import React from "react"
import { render, screen, waitFor } from "../../../tests/utils"
import { axe } from "jest-axe"
import EditableField from "../EditableField"
import userEvent from "@testing-library/user-event"

describe("EditableField.Text", () => {
  test("onSave is called when save button is clicked", async () => {
    // Arrange
    const onSave = jest.fn()
    render(
      <EditableField.Group onSave={onSave}>
        <EditableField.Text
          name="FIRST_FIELD"
          value="FIRST_VALUE_MODIFIED"
          defaultValue="FIRST_VALUE"
        />
        <EditableField.Text
          name="SECOND_FIELD"
          value="SECOND_VALUE_MODIFIED"
          defaultValue="SECOND_VALUE"
          controlsGroup
        />
      </EditableField.Group>
    )

    // Act
    userEvent.click(screen.getByLabelText("save"))

    expect(onSave).toHaveBeenCalledTimes(1)
    expect(onSave).toHaveBeenCalledWith({
      FIRST_FIELD: "FIRST_VALUE_MODIFIED",
      SECOND_FIELD: "SECOND_VALUE_MODIFIED",
    })
  })

  test("input values are reset when reset button is clicked", async () => {
    // Arrange
    const onChangeFirst = jest.fn()
    const onChangeSecond = jest.fn()
    render(
      <EditableField.Group>
        <EditableField.Text
          name="FIRST_FIELD"
          value="FIRST_VALUE_MODIFIED"
          defaultValue="FIRST_VALUE"
          onChange={onChangeFirst}
        />
        <EditableField.Text
          name="SECOND_FIELD"
          value="SECOND_VALUE_MODIFIED"
          defaultValue="SECOND_VALUE"
          onChange={onChangeSecond}
          controlsGroup
        />
      </EditableField.Group>
    )

    // Act
    userEvent.click(screen.getByLabelText("reset"))

    // Assert
    await waitFor(() => {
      expect(onChangeFirst).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: "FIRST_VALUE" }),
        })
      )
      expect(onChangeSecond).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: "SECOND_VALUE" }),
        })
      )
    })
  })

  describe("saveOnBlur", () => {
    test("onSave is called when input is unfocused if saveOnBlur is true", async () => {
      // Arrange
      const onSave = jest.fn()
      render(
        <EditableField.Group onSave={onSave} saveOnBlur resetOnBlur={false}>
          <EditableField.Text
            name="FIRST_FIELD"
            value="FIRST_VALUE_MODIFIED"
            defaultValue="FIRST_VALUE"
          />
          <EditableField.Text
            name="SECOND_FIELD"
            value="SECOND_VALUE_MODIFIED"
            defaultValue="SECOND_VALUE"
            controlsGroup
          />
        </EditableField.Group>
      )

      // Act
      const input = screen.queryAllByRole("textbox")[0]
      input.focus()
      input.blur()

      // Assert
      await waitFor(() => {
        expect(onSave).toHaveBeenCalledTimes(1)
        expect(onSave).toHaveBeenCalledWith({
          FIRST_FIELD: "FIRST_VALUE_MODIFIED",
          SECOND_FIELD: "SECOND_VALUE_MODIFIED",
        })
      })
    })

    test("onSave is not called when input is unfocused if saveOnBlur is false", async () => {
      // Arrange
      const onSave = jest.fn()
      render(
        <EditableField.Group
          onSave={onSave}
          saveOnBlur={false}
          resetOnBlur={false}
        >
          <EditableField.Text
            name="FIRST_FIELD"
            value="FIRST_VALUE_MODIFIED"
            defaultValue="FIRST_VALUE"
          />
          <EditableField.Text
            name="SECOND_FIELD"
            value="SECOND_VALUE_MODIFIED"
            defaultValue="SECOND_VALUE"
            controlsGroup
          />
        </EditableField.Group>
      )

      // Act
      const input = screen.queryAllByRole("textbox")[0]
      input.focus()
      input.blur()

      // Assert
      await waitFor(() => {
        expect(onSave).not.toHaveBeenCalled()
      })
    })
  })

  describe("resetOnBlur", () => {
    test("input value is reset on blur if resetOnBlur is true", async () => {
      // Arrange
      const onChangeFirst = jest.fn()
      const onChangeSecond = jest.fn()
      render(
        <EditableField.Group saveOnBlur={false} resetOnBlur={true}>
          <EditableField.Text
            name="FIRST_FIELD"
            value="FIRST_VALUE_MODIFIED"
            defaultValue="FIRST_VALUE"
            onChange={onChangeFirst}
          />
          <EditableField.Text
            name="SECOND_FIELD"
            value="SECOND_VALUE_MODIFIED"
            defaultValue="SECOND_VALUE"
            onChange={onChangeSecond}
            controlsGroup
          />
        </EditableField.Group>
      )

      // Act
      const input = screen.queryAllByRole("textbox")[0]
      input.focus()
      input.blur()

      // Assert
      await waitFor(() => {
        expect(onChangeFirst).toHaveBeenCalledWith(
          expect.objectContaining({
            target: expect.objectContaining({ value: "FIRST_VALUE" }),
          })
        )
        expect(onChangeSecond).toHaveBeenCalledWith(
          expect.objectContaining({
            target: expect.objectContaining({ value: "SECOND_VALUE" }),
          })
        )
      })
    })

    test("input value is not reset on blur if resetOnBlur is false", async () => {
      // Arrange
      const onChangeFirst = jest.fn()
      const onChangeSecond = jest.fn()
      render(
        <EditableField.Group saveOnBlur={false} resetOnBlur={true}>
          <EditableField.Text
            name="FIRST_FIELD"
            value="FIRST_VALUE_MODIFIED"
            defaultValue="FIRST_VALUE"
            onChange={onChangeFirst}
          />
          <EditableField.Text
            name="SECOND_FIELD"
            value="SECOND_VALUE_MODIFIED"
            defaultValue="SECOND_VALUE"
            onChange={onChangeSecond}
            controlsGroup
          />
        </EditableField.Group>
      )

      // Act
      const input = screen.queryAllByRole("textbox")[0]
      input.focus()
      input.blur()

      // Assert
      await waitFor(() => {
        expect(onChangeFirst).not.toHaveBeenCalled()
        expect(onChangeSecond).not.toHaveBeenCalled()
      })
    })
  })

  test("passes a11y check", async () => {
    // Arrange
    const { container } = render(
      <EditableField.Group>
        <EditableField.Text
          name="FIRST_FIELD"
          value="FIRST_VALUE_MODIFIED"
          defaultValue="FIRST_VALUE"
        />
        <EditableField.Text
          name="SECOND_FIELD"
          value="SECOND_VALUE_MODIFIED"
          defaultValue="SECOND_VALUE"
          controlsGroup
        />
      </EditableField.Group>
    )
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })
})
