/** @jsxImportSource theme-ui */
import { useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import DesktopModal, { DesktopModalProps } from './DesktopModal';
import Button from '../Button/Button';

export default {
  title: 'Design System/DesktopModal',
  component: DesktopModal,
  parameters: {
    creevey: {
      captureElement: null,
    },
  },
} as Meta;

const Template: Story<DesktopModalProps> = () => {
  const [isOpen, setModalOpen] = useState(true);

  return (
    <>
      <Button onClick={() => setModalOpen(!isOpen)}>Toggle Open</Button>
      <DesktopModal isOpen={isOpen}>
        <DesktopModal.Header>
          <DesktopModal.Title>Title</DesktopModal.Title>
          <DesktopModal.Actions>
            <Button
              color="secondary"
              variant="plain"
              onClick={() => setModalOpen(false)}
            >
              Close
            </Button>
          </DesktopModal.Actions>
        </DesktopModal.Header>
        <DesktopModal.Body>
          The modal can have a body text with complementary info
        </DesktopModal.Body>
        <DesktopModal.Actions>
          <Button color="secondary" variant="filledLight">
            Some other button
          </Button>
          <Button>Primary Action</Button>
        </DesktopModal.Actions>
      </DesktopModal>
    </>
  );
};
export const Default = Template.bind({});
