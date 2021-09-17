/** @jsxImportSource theme-ui */
import React, { useState } from "react"
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
        <div>Modal info 1</div>
        <div>Modal info</div>
        <div>Modal info</div>
        <div>Modal info</div>
        <div>Modal info</div>
        <div>Modal info</div>
        <div>Modal info</div>
        <div>Modal info</div>
        <div>Modal info</div>
        <div>Modal info</div>
        <div>Modal info</div>
        <div>Modal info</div>
        <div>Modal info</div>
        <div>Modal info</div>
        <div>Modal info</div>
        <div>Modal info</div>
        <div>Modal info</div>
        <div>Modal info</div>
        <div>Modal info</div>
        <div>Modal info</div>
        <div>Modal info</div>
        <div>Modal info</div>
        <div>Modal info</div>
        <div>Modal info</div>
        <div>Modal info</div>
        <div>Modal info</div>
        <div>Modal info</div>
        <div>Modal info</div>
        <div>Modal info</div>
        <div>Modal info</div>
        <div>Modal info</div>
        <div>Modal info</div>
        <div>Modal info</div>
        <div>Modal info</div>
        <div>Modal info</div>
        <div>Modal info</div>
        <div>Modal info</div>
        <div>Modal info</div>
        <div>Modal info</div>
        <div>Modal info</div>
        <div>Modal info</div>
        <div>Modal info</div>
        <div>Modal info</div>
        <div>Modal info</div>
        <div>Modal info</div>
        <Button onClick={() => setModalOpen(false)}>Close modal</Button>
      </DesktopModal>
    </>
  )
}

export const Default = Template.bind({})
