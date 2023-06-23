import { render, screen, fireEvent, waitFor } from "../../tests/utils"
import DateSelect from "./DateSelect"
import userEvent from "@testing-library/user-event"
import { axe } from "jest-axe"

describe("DateSelect", () => {
  test("date options appear on click", async () => {
    render(
      <DateSelect>
        <DateSelect.Option value={{ from: "12/05/2021", to: "12/05/2021" }}>
          Today
        </DateSelect.Option>
        <DateSelect.Option value={{ from: "13/05/2021", to: "13/05/2021" }}>
          Tomorrow
        </DateSelect.Option>
      </DateSelect>
    )

    expect(screen.queryByText(/today/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/tomorrow/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/customizar/i)).not.toBeInTheDocument()
    userEvent.click(screen.getByText(/select an option/i))
    await waitFor(() => {
      expect(screen.getByText(/today/i)).toBeInTheDocument()
      expect(screen.getByText(/tomorrow/i)).toBeInTheDocument()
      expect(screen.getByText(/customizar/i)).toBeInTheDocument()
    })
  })

  test("onChange is called when an option is selected", async () => {
    const onChange = jest.fn()
    render(
      <DateSelect
        onChange={onChange}
        value={{
          from: "",
          to: "",
        }}
      >
        <DateSelect.Option value={{ from: "12/05/2021", to: "12/05/2021" }}>
          Today
        </DateSelect.Option>
      </DateSelect>
    )

    userEvent.click(screen.getByText(/select an option/i))
    userEvent.click(await screen.findByText(/today/i))

    await waitFor(() =>
      expect(onChange).toHaveBeenCalledWith({
        from: "12/05/2021",
        to: "12/05/2021",
      })
    )
  })

  test("select button shows current selected item text", async () => {
    const value = { from: "12/05/2021", to: "12/05/2021" }

    render(
      <DateSelect value={value}>
        <DateSelect.Option value={value}>Today</DateSelect.Option>
      </DateSelect>
    )

    expect(screen.getByText(/today/i)).toBeInTheDocument()
  })

  test("custom date range popover appears when custom option is clicked", async () => {
    render(
      <DateSelect>
        <DateSelect.Option value={{ from: "12/05/2021", to: "12/05/2021" }}>
          Today
        </DateSelect.Option>
      </DateSelect>
    )

    userEvent.click(screen.getByText(/select an option/i))
    expect(
      screen.queryByRole("textbox", { name: /inicial/i })
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole("textbox", { name: /final/i })
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole("button", { name: /aplicar/i })
    ).not.toBeInTheDocument()
    const customClikElement = await screen.findByText(/custom/i)
    userEvent.click(customClikElement)

    await waitFor(() => {
      expect(
        screen.getByRole("textbox", { name: /inicial/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole("textbox", { name: /final/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole("button", { name: /aplicar/i })
      ).toBeInTheDocument()
    })
  })

  test("custom date cannot be set if 'from' date is after 'to' date", async () => {
    render(
      <DateSelect>
        <DateSelect.Option value={{ from: "12/05/2021", to: "12/05/2021" }}>
          Today
        </DateSelect.Option>
      </DateSelect>
    )

    userEvent.click(screen.getByText(/select an option/i))
    await waitFor(() => userEvent.click(screen.getByText(/customizar/i)))
    const fromInput = screen.getByRole("textbox", { name: /inicial/i })
    const toInput = screen.getByRole("textbox", { name: /final/i })
    const setButton = screen.getByRole("button", { name: /aplicar/i })
    expect(setButton).toBeDisabled()

    // default format is MM/dd/yyyy
    fireEvent.change(fromInput, { target: { value: "01/01/2020" } })
    fireEvent.change(toInput, { target: { value: "01/01/2010" } })
    expect(setButton).toBeDisabled()
  })

  test("onChange is called with custom date", async () => {
    const onChange = jest.fn()
    render(
      <DateSelect onChange={onChange}>
        <DateSelect.Option value={{ from: "12/05/2021", to: "12/05/2021" }}>
          Today
        </DateSelect.Option>
      </DateSelect>
    )

    userEvent.click(screen.getByText(/select an option/i))
    await waitFor(() => userEvent.click(screen.getByText(/customizar/i)))
    const fromInput = screen.getByRole("textbox", { name: /inicial/i })
    const toInput = screen.getByRole("textbox", { name: /final/i })
    const setButton = screen.getByRole("button", { name: /aplicar/i })
    expect(setButton).toBeDisabled()

    // default format is MM/dd/yyyy
    fireEvent.change(fromInput, { target: { value: "05/09/2020" } })
    fireEvent.change(toInput, { target: { value: "02/03/2022" } })
    expect(setButton).not.toBeDisabled()
    expect(onChange).not.toHaveBeenCalled()
    userEvent.click(setButton)
    expect(onChange).toHaveBeenCalledWith({
      from: "05/09/2020",
      to: "02/03/2022",
    })
  })

  test("passes a11y check", async () => {
    // Arrange
    const { container } = render(
      <DateSelect>
        <DateSelect.Option value={{ from: "12/05/2021", to: "12/05/2021" }}>
          Today
        </DateSelect.Option>
        <DateSelect.Option value={{ from: "13/05/2021", to: "13/05/2021" }}>
          Tomorrow
        </DateSelect.Option>
        <DateSelect.Option value={{ from: "09/05/2021", to: "15/05/2021" }}>
          This week
        </DateSelect.Option>
        <DateSelect.Option value={{ from: "16/05/2021", to: "22/05/2021" }}>
          Next week
        </DateSelect.Option>
        <DateSelect.Option value={{ from: "01/05/2021", to: "31/05/2021" }}>
          This month
        </DateSelect.Option>
        <DateSelect.Option value={{ from: "01/05/2021", to: "30/05/2021" }}>
          Next month
        </DateSelect.Option>
      </DateSelect>
    )
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })
})
