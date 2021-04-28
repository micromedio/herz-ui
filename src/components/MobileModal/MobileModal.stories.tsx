/** @jsxRuntime classic /
/** @jsx jsx */
import { jsx } from "theme-ui"
import MobileModal, { MobileModalProps } from "./MobileModal"
import { Meta, Story } from "@storybook/react/types-6-0"
import Button from "../Button/Button"
import { useState } from "react"
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport"

export default {
  title: "Design System/MobileModal",
  component: MobileModal,
  parameters: {
    viewport: {
      //👇 The viewports you want to use
      viewports: INITIAL_VIEWPORTS,
      //👇 Your own default viewport
      defaultViewport: "iphone5",
    },
  },
} as Meta

const DraggableTemplate: Story<MobileModalProps> = (
  props: MobileModalProps
) => {
  return (
    <div style={{ height: `100%`, width: 300 }}>
      <p>
        Remember to open the devTools, and simulate mobile devices with Device
        Mode
      </p>
      <MobileModal {...props}>
        <div
          sx={{
            "&::before": {
              backgroundColor: `text.90`,
              content: `""`,
              display: `block`,
              height: 4,
              // 84 (20px half of this component width and 64px for lateral paddings)
              left: `calc((100% - 84px) / 2)`,
              position: `relative`,
              top: `8px`,
              width: 40,
            },
          }}
        />
      </MobileModal>
    </div>
  )
}

const NonDismissibleTemplate: Story<MobileModalProps> = (
  props: MobileModalProps
) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div style={{ height: `100%`, width: 300 }}>
      <Button
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        Toggle Open
      </Button>
      <MobileModal {...props} open={isOpen}>
        <Button
          iconName="IconChevronLeft"
          onClick={() => {
            setIsOpen(!isOpen)
          }}
        >
          Back
        </Button>
      </MobileModal>
    </div>
  )
}

const DismissibleTemplate: Story<MobileModalProps> = (
  props: MobileModalProps
) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div style={{ height: `100%`, width: 300 }}>
      <Button
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        Toggle Open
      </Button>
      <MobileModal
        {...props}
        dismissible={() => {
          setIsOpen(false)
        }}
        open={isOpen}
      >
        <Button
          iconName="IconChevronLeft"
          onClick={() => {
            setIsOpen(!isOpen)
          }}
        >
          Back
        </Button>
      </MobileModal>
    </div>
  )
}

export const Default = NonDismissibleTemplate.bind({})

export const WithSpacing = NonDismissibleTemplate.bind({})
WithSpacing.args = {
  ...NonDismissibleTemplate.args,
  topSpacing: 160,
}

export const WithSpacingAndDismissible = DismissibleTemplate.bind({})
WithSpacingAndDismissible.args = {
  ...NonDismissibleTemplate.args,
  topSpacing: 160,
}

export const Draggable = DraggableTemplate.bind({})
Draggable.args = {
  ...NonDismissibleTemplate.args,
  draggable: true,
  overflowHeight: 64,
}

export const DraggableWithoutOverflow = DraggableTemplate.bind({})
DraggableWithoutOverflow.args = {
  draggable: true,
  ...NonDismissibleTemplate.args,
}

export const DraggableWithSpacing = DraggableTemplate.bind({})
DraggableWithSpacing.args = {
  draggable: true,
  overflowHeight: 64,
  topSpacing: 128,
  ...NonDismissibleTemplate.args,
}

export const DraggableWithSpacingAndDismissible = DraggableTemplate.bind({})
DraggableWithSpacingAndDismissible.args = {
  ...NonDismissibleTemplate.args,
  dismissible: true,
  draggable: true,
  overflowHeight: 64,
  topSpacing: 160,
}
