/** @jsxRuntime classic /
/** @jsx jsx */
import { jsx } from "theme-ui"
import MobileModal, { MobileModalProps } from "./MobileModal"
import { Meta, Story } from "@storybook/react/types-6-0"
import Button from "../Button/Button"
import React, { useState } from "react"
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport"
import { Icon } from ".."
import ListSelect from "../ListSelect/ListSelect"
import TextField from "../TextField/TextField"

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

const valueListItems = [
  {
    label: "ICU 2nd Floor 2.4GHz",
    value: "icu 2nd floor 2.4ghz",
    suffix: <Icon name="IconWifi" sx={{ color: "secondary.0" }} />,
  },
  {
    label: "ICU 1st Floor 2.4GHz",
    value: "icu 1st floor 2.4ghz",
    suffix: <Icon name="IconWifi2" sx={{ color: "secondary.0" }} />,
  },
  {
    label: "ICU Front Desk 2.4GHz",
    value: "icu front desk 2.4ghz",
    suffix: <Icon name="IconWifi1" sx={{ color: "secondary.0" }} />,
  },
]

const ModalContent = () => (
  <React.Fragment>
    <h1 sx={{ marginTop: 0, textAlign: `center`, variant: `text.heading1` }}>
      Enter Wi-Fi Password
    </h1>
    <ListSelect options={valueListItems} />
  </React.Fragment>
)

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
        <ModalContent />
      </MobileModal>
    </div>
  )
}

const DraggableAndScrolalbleTemplate: Story<MobileModalProps> = (
  props: MobileModalProps
) => {
  const [password, setPassword] = useState(``)

  return (
    <div style={{ height: `100%`, width: 300 }}>
      <p>
        Remember to open the devTools, and simulate mobile devices with Device
        Mode
      </p>
      <MobileModal {...props}>
        <ModalContent />
        <div sx={{ margin: `16px 0` }}>
          <TextField
            onChange={(event) => {
              setPassword(event.target.value)
            }}
            type="password"
            value={password}
          />
          <Button
            color="primary"
            onClick={() => {
              window.alert(`Connected with the password: ${password}`)
            }}
            sx={{ marginTop: 5, width: `100%` }}
          >
            Connect
          </Button>
        </div>
        <span sx={{ marginBottom: 6, textAlign: `justify`, variant: `body1` }}>
          <p>
            <strong>Lorem Ipsum</strong> is simply dummy text of the printing
            and typesetting industry. Lorem Ipsum has been the industry&apos;s
            standard dummy text ever since the 1500s, when an unknown printer
            took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was
            popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum.
          </p>
          <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33 of &ldquo;de Finibus Bonorum et Malorum&ldquo;
            (The Extremes of Good and Evil) by Cicero, written in 45 BC. This
            book is a treatise on the theory of ethics, very popular during the
            Renaissance. The first line of Lorem Ipsum, &ldquo;Lorem ipsum dolor
            sit amet..&ldquo;, comes from a line in section 1.10.32.{" "}
          </p>
          <p>
            The standard chunk of Lorem Ipsum used since the 1500s is reproduced
            below for those interested. Sections 1.10.32 and 1.10.33 from
            &ldquo;de Finibus Bonorum et Malorum&ldquo; by Cicero are also
            reproduced in their exact original form, accompanied by English
            versions from the 1914 translation by H. Rackham.
          </p>
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using &apos;Content here,
            content here&apos;, making it look like readable English. Many
            desktop publishing packages and web page editors now use Lorem Ipsum
            as their default model text, and a search for &apos;lorem
            ipsum&apos; will uncover many web sites still in their infancy.
            Various versions have evolved over the years, sometimes by accident,
            sometimes on purpose (injected humour and the like).
          </p>
          <p>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don&apos;t look even slightly
            believable. If you are going to use a passage of Lorem Ipsum, you
            need to be sure there isn&apos;t anything embarrassing hidden in the
            middle of text. All the Lorem Ipsum generators on the Internet tend
            to repeat predefined chunks as necessary, making this the first true
            generator on the Internet. It uses a dictionary of over 200 Latin
            words, combined with a handful of model sentence structures, to
            generate Lorem Ipsum which looks reasonable. The generated Lorem
            Ipsum is therefore always free from repetition, injected humour, or
            non-characteristic words etc.
          </p>
        </span>
      </MobileModal>
    </div>
  )
}

const NonDismissibleTemplate: Story<MobileModalProps> = (
  props: MobileModalProps
) => {
  const [isOpen, setIsOpen] = useState<boolean>(props.open || false)

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
        <div
          sx={{
            alignContent: `center`,
            alignItems: `center`,
            display: `flex`,
            flexDirection: `column`,
            justifyContent: `space-evenly`,
            "> button:first-of-type": {
              alignSelf: `flex-start`,
              marginBottom: 64,
            },
          }}
        >
          <Button
            color="text"
            iconName="IconChevronLeft"
            onClick={() => {
              setIsOpen(!isOpen)
            }}
            variant="filled"
          >
            Back
          </Button>
          <ModalContent />
        </div>
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
        onDismiss={() => {
          setIsOpen(false)
        }}
        open={isOpen}
      >
        <div
          sx={{
            alignContent: `center`,
            alignItems: `center`,
            display: `flex`,
            flexDirection: `column`,
            justifyContent: `space-evenly`,
            "> button:first-of-type": {
              alignSelf: `flex-start`,
              marginBottom: 64,
            },
          }}
        >
          <Button
            color="text"
            iconName="IconChevronLeft"
            onClick={() => {
              setIsOpen(!isOpen)
            }}
            variant="filled"
          >
            Back
          </Button>
          <ModalContent />
        </div>
      </MobileModal>
    </div>
  )
}

export const Default = NonDismissibleTemplate.bind({})

export const DefaultOpen = NonDismissibleTemplate.bind({})
DefaultOpen.args = {
  ...DefaultOpen.args,
  topSpacing: 160,
  open: true,
}

export const Dismissible = DismissibleTemplate.bind({})
Dismissible.args = {
  ...Dismissible.args,
  topSpacing: 160,
}

export const Draggable = DraggableTemplate.bind({})
Draggable.args = {
  ...Draggable.args,
  draggable: true,
  overflowHeight: 64,
}

export const DraggableWithoutOverflow = DraggableTemplate.bind({})
DraggableWithoutOverflow.args = {
  ...DraggableWithoutOverflow.args,
  draggable: true,
}

export const DraggableAndScrollable = DraggableAndScrolalbleTemplate.bind({})
DraggableAndScrollable.args = {
  ...DraggableWithoutOverflow.args,
  draggable: true,
  overflowHeight: 64,
  topSpacing: 128,
}

export const DraggableFullscreen = DraggableAndScrolalbleTemplate.bind({})
DraggableFullscreen.args = {
  ...DraggableFullscreen.args,
  draggable: true,
  overflowHeight: 64,
  topSpacing: 0,
}

export const DraggableAndDismissible = DraggableTemplate.bind({})
DraggableAndDismissible.args = {
  ...DraggableAndDismissible.args,
  dismissible: true,
  draggable: true,
  overflowHeight: 64,
}
