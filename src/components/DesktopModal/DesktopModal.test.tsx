import { useState } from "react"
import { render, waitFor } from "../../tests/utils"
import userEvent from "@testing-library/user-event"
import Button from "../Button/Button"
import DesktopModal from "./DesktopModal"

describe("Desktop Modal | integration test", () => {
  const ModalWrapper = ({ open = false }: { open?: boolean }) => {
    const [isOpen, setOpen] = useState(open)

    return (
      <>
        <Button onClick={() => setOpen(!isOpen)}>Toggle Open</Button>
        <DesktopModal
          onClose={() => setOpen(false)}
          onSubmit={() => alert("submitted")}
          isVisible={isOpen}
          title="Create new organization"
        >
          <div>Modal info</div>
        </DesktopModal>
      </>
    )
  }
  test("if modal opens on click and renders info", async () => {
    const { getByText } = render(<ModalWrapper />)
    userEvent.click(getByText("Toggle open", { exact: false }))
    await waitFor(() => {
      expect(getByText(/create new organization/i)).toBeInTheDocument()
      expect(getByText(/modal info/i)).toBeInTheDocument()
    })
  })

  test("if modal closes when clicked on close button", async () => {
    const { getByText, queryByText } = render(<ModalWrapper open />)
    userEvent.click(getByText("Cancel", { exact: false }))

    await waitFor(() => {
      expect(queryByText(/create new organization/i)).not.toBeInTheDocument()
      expect(queryByText(/modal info/i)).not.toBeInTheDocument()
    })
  })

  test("if submit button fire event when clicked", async () => {
    global.alert = jest.fn()
    const { getByText } = render(<ModalWrapper open />)
    userEvent.click(getByText("Done", { exact: false }))
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledTimes(1)
    })
  })
})
