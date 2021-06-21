import { render, screen, waitFor } from "../../tests/utils"
import { axe } from "jest-axe"
import Tab from "./Tab"
import userEvent from "@testing-library/user-event"

describe("Tab", () => {
  test("do not renders closed tab", async () => {
    // Arrange
    render(
      <Tab initialOpenIndex={1}>
        <Tab.Link title="ITEM_TITLE_0" />
        <Tab.Link title="ITEM_TITLE_1" />
        <Tab.Link title="ITEM_TITLE_2" />
        <Tab.Panel index={0}>ITEM_PANEL_0</Tab.Panel>
        <Tab.Panel index={1}>ITEM_PANEL_1</Tab.Panel>
        <Tab.Panel index={2}>ITEM_PANEL_2</Tab.Panel>
      </Tab>
    )
    // Assert
    expect(screen.queryByText("ITEM_TITLE_0")).toBeInTheDocument()
    expect(screen.queryByText("ITEM_TITLE_1")).toBeInTheDocument()
    expect(screen.queryByText("ITEM_TITLE_2")).toBeInTheDocument()
    expect(screen.queryByText("ITEM_PANEL_0")).not.toBeInTheDocument()
    expect(screen.queryByText("ITEM_PANEL_1")).toBeInTheDocument()
    expect(screen.queryByText("ITEM_PANEL_2")).not.toBeInTheDocument()
  })

  test("opens when clicked", async () => {
    // Arrange
    render(
      <Tab initialOpenIndex={1}>
        <Tab.Link title="ITEM_TITLE_0" />
        <Tab.Link title="ITEM_TITLE_1" />
        <Tab.Link title="ITEM_TITLE_2" />
        <Tab.Panel index={0}>ITEM_PANEL_0</Tab.Panel>
        <Tab.Panel index={1}>ITEM_PANEL_1</Tab.Panel>
        <Tab.Panel index={2}>ITEM_PANEL_2</Tab.Panel>
      </Tab>
    )
    // Assert
    expect(screen.queryByText("ITEM_TITLE_0")).toBeInTheDocument()
    expect(screen.queryByText("ITEM_TITLE_1")).toBeInTheDocument()
    expect(screen.queryByText("ITEM_TITLE_2")).toBeInTheDocument()
    expect(screen.queryByText("ITEM_PANEL_0")).not.toBeInTheDocument()
    expect(screen.queryByText("ITEM_PANEL_1")).toBeInTheDocument()
    expect(screen.queryByText("ITEM_PANEL_2")).not.toBeInTheDocument()

    userEvent.click(screen.getByText("ITEM_TITLE_2"))
    await waitFor(() =>
      expect(screen.queryByText("ITEM_PANEL_2")).toBeInTheDocument()
    )

    userEvent.click(screen.getByText("ITEM_TITLE_0"))
    await waitFor(() => {
      expect(screen.queryByText("ITEM_PANEL_2")).not.toBeInTheDocument()
      expect(screen.queryByText("ITEM_PANEL_0")).toBeInTheDocument()
    })
  })

  test("passes a11y check", async () => {
    // Arrange
    const { container } = render(
      <Tab initialOpenIndex={1}>
        <Tab.Link title="ITEM_TITLE_0" />
        <Tab.Link title="ITEM_TITLE_1" />
        <Tab.Link title="ITEM_TITLE_2" />
        <Tab.Panel index={0}>ITEM_PANEL_0</Tab.Panel>
        <Tab.Panel index={1}>ITEM_PANEL_1</Tab.Panel>
        <Tab.Panel index={2}>ITEM_PANEL_2</Tab.Panel>
      </Tab>
    )
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })
})
