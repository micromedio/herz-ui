import { useState } from "react"
import { render, waitFor } from "../../tests/utils"
import userEvent from "@testing-library/user-event"
import Button from "../Button/Button"
import Dialog from "./Dialog"

describe("Desktop Modal | integration test", () => {
  const ModalWrapper = ({ open = false }: { open?: boolean }) => {
    const [isOpen, setOpen] = useState(open)

    return (
      <>
        <Button onClick={() => setOpen(!isOpen)}>Toggle Open</Button>
        <Dialog isOpen={isOpen}>
          <div>Modal info</div>
        </Dialog>
      </>
    )
  }
  test("if modal opens on click and renders info", async () => {
    const { getByText } = render(<ModalWrapper />)
    userEvent.click(getByText("Toggle open", { exact: false }))
    await waitFor(() => {
      expect(getByText(/modal info/i)).toBeInTheDocument()
    })
  })
})
