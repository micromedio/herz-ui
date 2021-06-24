import { render, screen, waitFor } from "../../tests/utils"
import { axe } from "jest-axe"
import Accordion from "./Accordion"
import userEvent from "@testing-library/user-event"

describe("Accordion", () => {
  test("renders collapsed", async () => {
    // Arrange
    render(
      <Accordion>
        <Accordion.Item title="ITEM_TITLE_1">ITEM_CONTENT_1</Accordion.Item>
        <Accordion.Item title="ITEM_TITLE_2">ITEM_CONTENT_2</Accordion.Item>
      </Accordion>
    )
    // Assert
    expect(screen.queryByText("ITEM_CONTENT_1")).not.toBeInTheDocument()
    expect(screen.queryByText("ITEM_CONTENT_2")).not.toBeInTheDocument()
    expect(screen.queryByText("ITEM_TITLE_1")).toBeInTheDocument()
    expect(screen.queryByText("ITEM_TITLE_2")).toBeInTheDocument()
  })

  test("renders opened item", async () => {
    // Arrange
    render(
      <Accordion initialOpenIndex={0}>
        <Accordion.Item title="ITEM_TITLE_1">ITEM_CONTENT_1</Accordion.Item>
        <Accordion.Item title="ITEM_TITLE_2">ITEM_CONTENT_2</Accordion.Item>
      </Accordion>
    )
    // Assert
    expect(screen.queryByText("ITEM_CONTENT_1")).toBeInTheDocument()
    expect(screen.queryByText("ITEM_CONTENT_2")).not.toBeInTheDocument()
    expect(screen.queryByText("ITEM_TITLE_1")).toBeInTheDocument()
    expect(screen.queryByText("ITEM_TITLE_2")).toBeInTheDocument()
  })

  test("opens when clicked", async () => {
    // Arrange
    render(
      <Accordion>
        <Accordion.Item title="ITEM_TITLE_1">ITEM_CONTENT_1</Accordion.Item>
        <Accordion.Item title="ITEM_TITLE_2">ITEM_CONTENT_2</Accordion.Item>
      </Accordion>
    )
    // Assert
    expect(screen.queryByText("ITEM_CONTENT_1")).not.toBeInTheDocument()
    expect(screen.queryByText("ITEM_CONTENT_2")).not.toBeInTheDocument()
    expect(screen.queryByText("ITEM_TITLE_1")).toBeInTheDocument()
    expect(screen.queryByText("ITEM_TITLE_2")).toBeInTheDocument()

    userEvent.click(screen.getByText("ITEM_TITLE_2"))
    await waitFor(() =>
      expect(screen.queryByText("ITEM_CONTENT_2")).toBeInTheDocument()
    )

    userEvent.click(screen.getByText("ITEM_TITLE_1"))
    await waitFor(() => {
      expect(screen.queryByText("ITEM_CONTENT_2")).not.toBeInTheDocument()
      expect(screen.queryByText("ITEM_CONTENT_1")).toBeInTheDocument()
    })
  })

  test("clises open item when clicked", async () => {
    // Arrange
    render(
      <Accordion initialOpenIndex={0}>
        <Accordion.Item title="ITEM_TITLE_1">ITEM_CONTENT_1</Accordion.Item>
        <Accordion.Item title="ITEM_TITLE_2">ITEM_CONTENT_2</Accordion.Item>
      </Accordion>
    )
    // Assert
    expect(screen.queryByText("ITEM_CONTENT_1")).toBeInTheDocument()
    expect(screen.queryByText("ITEM_CONTENT_2")).not.toBeInTheDocument()
    expect(screen.queryByText("ITEM_TITLE_1")).toBeInTheDocument()
    expect(screen.queryByText("ITEM_TITLE_2")).toBeInTheDocument()

    userEvent.click(screen.getByText("ITEM_TITLE_1"))
    await waitFor(() =>
      expect(screen.queryByText("ITEM_CONTENT_1")).not.toBeInTheDocument()
    )
  })

  test("passes a11y check", async () => {
    // Arrange
    const { container } = render(
      <Accordion initialOpenIndex={0}>
        <Accordion.Item title="ITEM_TITLE_1">ITEM_CONTENT_1</Accordion.Item>
        <Accordion.Item title="ITEM_TITLE_2">ITEM_CONTENT_2</Accordion.Item>
      </Accordion>
    )
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })
})
