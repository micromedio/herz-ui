/** @jsxImportSource theme-ui */
import { useState } from "react"
import { Meta, Story } from "@storybook/react/types-6-0"
import DesktopModal, { DesktopModalProps } from "./DesktopModal"
import Button from "../Button/Button"

export default {
  title: "Design System/DesktopModal",
  component: DesktopModal,
} as Meta

const Template: Story<DesktopModalProps> = (props: DesktopModalProps) => {
  const [isOpen, setModalOpen] = useState(true)

  return (
    <>
      <Button onClick={() => setModalOpen(!isOpen)}>Toggle Open</Button>
      <DesktopModal {...props} isVisible={isOpen}>
        <div sx={{ display: "grid", gap: 6, p: 8, pb: 12, minWidth: 500 }}>
          Modal info
        </div>
        <Button onClick={() => setModalOpen(false)}>Close modal</Button>
      </DesktopModal>
    </>
  )
}

export const Default = Template.bind({})
