/** @jsxImportSource theme-ui */
import { useState } from "react"
import { Meta, Story } from "@storybook/react/types-6-0"
import Dialog from "./Dialog"
import Button from "../Button/Button"

export default {
  title: "Design System/Dialog",
  component: Dialog,
  parameters: {
    creevey: {
      captureElement: null,
    },
  },
} as Meta

const Template: Story = () => {
  const [isOpen, setDialogOpen] = useState(true)

  return (
    <div>
      <Button onClick={() => setDialogOpen(!isOpen)}>Toggle Open</Button>
      <Dialog isOpen={isOpen} onDismiss={() => setDialogOpen(false)}>
        <div sx={{ backgroundColor: "white" }}>
          <div>Dialog info 1</div>
          <div>Dialog info</div>
          <div>Dialog info</div>
          <div>Dialog info</div>
          <div>Dialog info</div>
          <Button onClick={() => setDialogOpen(false)}>Close Dialog</Button>
        </div>
      </Dialog>
    </div>
  )
}
export const Default = Template.bind({})

const MultipleDialogsTemplate = () => {
  const [isDialog1Open, setIsDialog1Open] = useState(true)
  const [isDialog2Open, setIsDialog2Open] = useState(true)

  return (
    <div>
      <Button onClick={() => setIsDialog1Open(true)}>Open Dialog 1</Button>
      <Dialog isOpen={isDialog1Open} onDismiss={() => setIsDialog1Open(false)}>
        <div sx={{ backgroundColor: "white", height: 700 }}>
          <h1>Dialog 1</h1>
          <Button onClick={() => setIsDialog2Open(true)}>Open Dialog 2</Button>
          <Button onClick={() => setIsDialog1Open(false)}>Close</Button>
          <Dialog
            isOpen={isDialog2Open}
            onDismiss={() => setIsDialog2Open(false)}
          >
            <div sx={{ backgroundColor: "white", width: 500 }}>
              <h1>Dialog 2</h1>
              <Button onClick={() => setIsDialog2Open(false)}>Close</Button>
            </div>
          </Dialog>
        </div>
      </Dialog>
    </div>
  )
}

export const MultipleDialogs = MultipleDialogsTemplate.bind({})

const LockBackgroundScrollingTemplate = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(true)

  return (
    <div
      sx={{
        background: "success.90",
        height: 2000,
      }}
    >
      <Button onClick={() => setIsDialogOpen(true)}>Open Dialog 1</Button>
      <Dialog isOpen={isDialogOpen} onDismiss={() => setIsDialogOpen(false)}>
        <div sx={{ backgroundColor: "white" }}>
          <h1>Dialog 1</h1>
          <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
        </div>
      </Dialog>
    </div>
  )
}

export const LockBackgroundScrolling = LockBackgroundScrollingTemplate.bind({})

const ScrollingDialogTemplate: Story = () => {
  const [isOpen, setDialogOpen] = useState(true)

  return (
    <div>
      <Button onClick={() => setDialogOpen(!isOpen)}>Toggle Open</Button>
      <Dialog isOpen={isOpen} onDismiss={() => setDialogOpen(false)}>
        <div sx={{ backgroundColor: "white", height: 2000 }}>
          <div>Dialog info 1</div>
          <div>Dialog info</div>
          <div>Dialog info</div>
          <div>Dialog info</div>
          <div>Dialog info</div>
          <Button onClick={() => setDialogOpen(false)}>Close Dialog</Button>
        </div>
      </Dialog>
    </div>
  )
}
export const ScrollingDialog = ScrollingDialogTemplate.bind({})
