import { screen, render, fireEvent, waitFor } from "../../tests/utils"
import { axe } from "jest-axe"
import Snackbar from "./Snackbar"
import SnackbarProvider from "./context/SnackbarProvider"
import { useSnackbar } from "./hooks/useSnackbar"
import { EnqueueSnackbarArguments } from "./context/SnackbarContext"

describe("Snackbar", () => {
  test("should render title", async () => {
    // Arrange
    render(<Snackbar type="success" title="SNACKBAR_TITLE" />)

    // Assert
    expect(screen.getByText("SNACKBAR_TITLE")).toBeInTheDocument()
  })

  test("should render text body", async () => {
    // Arrange
    render(
      <Snackbar type="success" title="SNACKBAR_TITLE" body="SNACKBAR_BODY" />
    )

    // Assert
    expect(screen.getByText("SNACKBAR_BODY")).toBeInTheDocument()
  })

  test("should render ReactNode body", async () => {
    // Arrange
    render(
      <Snackbar
        type="success"
        title="SNACKBAR_TITLE"
        body={<span>SNACKBAR_REACTNODE_BODY</span>}
      />
    )

    // Assert
    expect(screen.getByText("SNACKBAR_REACTNODE_BODY")).toBeInTheDocument()
  })

  test("should not render close button when onClose is undefined", async () => {
    // Arrange
    render(
      <Snackbar type="success" title="SNACKBAR_TITLE" onClose={undefined} />
    )

    // Assert
    expect(
      screen.queryByRole("button", { name: "close" })
    ).not.toBeInTheDocument()
  })

  test("should call onClose when close button is clicked", async () => {
    // Arrange
    const onClose = jest.fn()
    render(<Snackbar type="success" title="SNACKBAR_TITLE" onClose={onClose} />)

    // Act
    const closeButton = screen.getByRole("button", { name: "close" })
    fireEvent.click(closeButton)

    // Assert
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  test("passes a11y check", async () => {
    // Arrange
    const { container } = render(<Snackbar type="success" title="Success!" />)
    const results = await axe(container)

    // Assert
    expect(results).toHaveNoViolations()
  })

  describe("useSnackbar hook", () => {
    let ids: string[] = []
    let closeId: string | undefined

    beforeEach(() => {
      ids = []
      closeId = undefined
    })

    const customRender: typeof render = (ui, options) =>
      render(ui, {
        wrapper({ children }: { children?: React.ReactNode }) {
          return <SnackbarProvider>{children}</SnackbarProvider>
        },
        ...options,
      })

    const HookContainer = (snack: EnqueueSnackbarArguments) => {
      const { closeSnackbar, enqueueSnackbar } = useSnackbar()
      return (
        <div>
          <button
            onClick={() => {
              const id = enqueueSnackbar(snack)
              ids.push(id)
            }}
          >
            enqueueSnackbar
          </button>
          <button onClick={() => closeSnackbar(closeId)}>closeSnackbar</button>
        </div>
      )
    }

    test("shows snackbars on enqueueSnackbar call", async () => {
      // Arrange
      const { rerender } = customRender(
        <HookContainer type="success" title="SNACKBAR_TITLE" isPersistent />
      )

      // Act
      expect(screen.queryByText("SNACKBAR_TITLE")).not.toBeInTheDocument()
      fireEvent.click(screen.getByRole("button", { name: "enqueueSnackbar" }))

      rerender(
        <HookContainer
          type="success"
          title="SECOND_SNACKBAR_TITLE"
          isPersistent
        />
      )
      fireEvent.click(screen.getByRole("button", { name: "enqueueSnackbar" }))

      expect(screen.getByText("SECOND_SNACKBAR_TITLE")).toBeInTheDocument()
      expect(screen.getByText("SNACKBAR_TITLE")).toBeInTheDocument()
    })

    test("closes all snackbars on closeSnackbar call with no arguments", async () => {
      // Arrange
      const { rerender } = customRender(
        <HookContainer type="success" title="SNACKBAR_TITLE" isPersistent />
      )

      // Act
      expect(screen.queryByText("SNACKBAR_TITLE")).not.toBeInTheDocument()
      fireEvent.click(screen.getByRole("button", { name: "enqueueSnackbar" }))

      rerender(
        <HookContainer
          type="success"
          title="SECOND_SNACKBAR_TITLE"
          isPersistent
        />
      )
      fireEvent.click(screen.getByRole("button", { name: "enqueueSnackbar" }))

      expect(screen.getByText("SECOND_SNACKBAR_TITLE")).toBeInTheDocument()
      expect(screen.getByText("SNACKBAR_TITLE")).toBeInTheDocument()

      fireEvent.click(screen.getByRole("button", { name: "closeSnackbar" }))
      expect(
        screen.queryByText("SECOND_SNACKBAR_TITLE")
      ).not.toBeInTheDocument()
      expect(screen.queryByText("SNACKBAR_TITLE")).not.toBeInTheDocument()
    })

    test("closes specific snackbar on enqueueSnackbar call with id", async () => {
      // Arrange
      const { rerender } = customRender(
        <HookContainer type="success" title="SNACKBAR_TITLE" isPersistent />
      )

      // Act
      expect(screen.queryByText("SNACKBAR_TITLE")).not.toBeInTheDocument()
      fireEvent.click(screen.getByRole("button", { name: "enqueueSnackbar" }))

      rerender(
        <HookContainer
          type="success"
          title="SECOND_SNACKBAR_TITLE"
          isPersistent
        />
      )
      fireEvent.click(screen.getByRole("button", { name: "enqueueSnackbar" }))

      expect(screen.getByText("SECOND_SNACKBAR_TITLE")).toBeInTheDocument()
      expect(screen.getByText("SNACKBAR_TITLE")).toBeInTheDocument()

      // closes snackbar with title SNACKBAR_TITLE
      closeId = ids[0]
      fireEvent.click(screen.getByRole("button", { name: "closeSnackbar" }))

      expect(screen.queryByText("SECOND_SNACKBAR_TITLE")).toBeInTheDocument()
      expect(screen.queryByText("SNACKBAR_TITLE")).not.toBeInTheDocument()
    })

    test("non-persistent snackbar hides after a delay", async () => {
      // Arrange
      customRender(
        <HookContainer
          type="success"
          title="SNACKBAR_TITLE"
          isPersistent={false}
          autoHideDuration={400}
        />
      )

      // Act
      expect(screen.queryByText("SNACKBAR_TITLE")).not.toBeInTheDocument()
      fireEvent.click(screen.getByRole("button", { name: "enqueueSnackbar" }))

      expect(screen.getByText("SNACKBAR_TITLE")).toBeInTheDocument()
      await waitFor(() =>
        expect(screen.queryByText("SNACKBAR_TITLE")).not.toBeInTheDocument()
      )
    })
  })
})
