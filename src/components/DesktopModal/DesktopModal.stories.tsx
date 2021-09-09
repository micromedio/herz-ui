import { useState } from "react"
import { Meta, Story } from "@storybook/react/types-6-0"
import DesktopModal, { DesktopModalProps } from "./DesktopModal"
import Button from "../Button/Button"

export default {
  title: "Design System/DesktopModal",
  component: DesktopModal,
} as Meta

const Template: Story<DesktopModalProps> = (props: DesktopModalProps) => {
  const [isOpen, setModalOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setModalOpen(!isOpen)}>Toggle Open</Button>
      <DesktopModal
        {...props}
        onClose={() => setModalOpen(false)}
        onSubmit={() => alert("submitted")}
        isVisible={isOpen}
        title="Create new organization"
      >
        <div>Modal info</div>
      </DesktopModal>
    </>
  )
}

export const Default = Template.bind({})

Default.args = {
  title: "Capture interval",
}
