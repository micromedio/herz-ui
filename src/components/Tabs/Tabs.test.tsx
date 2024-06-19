import { render, screen, waitFor } from '../../tests/utils';
import { axe } from 'jest-axe';
import Tabs from './Tabs';
import userEvent from '@testing-library/user-event';

describe('Tab', () => {
  test('do not renders closed tab', async () => {
    // Arrange
    render(
      <Tabs initialOpenIndex={1}>
        <Tabs.Tab title="ITEM_TITLE_0" />
        <Tabs.Tab title="ITEM_TITLE_1" />
        <Tabs.Tab title="ITEM_TITLE_2" />
        <Tabs.Panel index={0}>ITEM_PANEL_0</Tabs.Panel>
        <Tabs.Panel index={1}>ITEM_PANEL_1</Tabs.Panel>
        <Tabs.Panel index={2}>ITEM_PANEL_2</Tabs.Panel>
      </Tabs>
    );
    // Assert
    expect(screen.queryByText('ITEM_TITLE_0')).toBeInTheDocument();
    expect(screen.queryByText('ITEM_TITLE_1')).toBeInTheDocument();
    expect(screen.queryByText('ITEM_TITLE_2')).toBeInTheDocument();
    expect(screen.queryByText('ITEM_PANEL_0')).not.toBeInTheDocument();
    expect(screen.queryByText('ITEM_PANEL_1')).toBeInTheDocument();
    expect(screen.queryByText('ITEM_PANEL_2')).not.toBeInTheDocument();
  });

  test('opens when clicked', async () => {
    // Arrange
    render(
      <Tabs initialOpenIndex={1}>
        <Tabs.Tab title="ITEM_TITLE_0" />
        <Tabs.Tab title="ITEM_TITLE_1" />
        <Tabs.Tab title="ITEM_TITLE_2" />
        <Tabs.Panel index={0}>ITEM_PANEL_0</Tabs.Panel>
        <Tabs.Panel index={1}>ITEM_PANEL_1</Tabs.Panel>
        <Tabs.Panel index={2}>ITEM_PANEL_2</Tabs.Panel>
      </Tabs>
    );
    // Assert
    expect(screen.queryByText('ITEM_TITLE_0')).toBeInTheDocument();
    expect(screen.queryByText('ITEM_TITLE_1')).toBeInTheDocument();
    expect(screen.queryByText('ITEM_TITLE_2')).toBeInTheDocument();
    expect(screen.queryByText('ITEM_PANEL_0')).not.toBeInTheDocument();
    expect(screen.queryByText('ITEM_PANEL_1')).toBeInTheDocument();
    expect(screen.queryByText('ITEM_PANEL_2')).not.toBeInTheDocument();

    userEvent.click(screen.getByText('ITEM_TITLE_2'));
    await waitFor(() =>
      expect(screen.queryByText('ITEM_PANEL_2')).toBeInTheDocument()
    );

    userEvent.click(screen.getByText('ITEM_TITLE_0'));
    await waitFor(() => {
      expect(screen.queryByText('ITEM_PANEL_2')).not.toBeInTheDocument();
      expect(screen.queryByText('ITEM_PANEL_0')).toBeInTheDocument();
    });
  });

  test('passes a11y check', async () => {
    // Arrange
    const { container } = render(
      <Tabs initialOpenIndex={1}>
        <Tabs.Tab title="ITEM_TITLE_0" />
        <Tabs.Tab title="ITEM_TITLE_1" />
        <Tabs.Tab title="ITEM_TITLE_2" />
        <Tabs.Panel index={0}>ITEM_PANEL_0</Tabs.Panel>
        <Tabs.Panel index={1}>ITEM_PANEL_1</Tabs.Panel>
        <Tabs.Panel index={2}>ITEM_PANEL_2</Tabs.Panel>
      </Tabs>
    );
    const results = await axe(container);

    // Assert
    expect(results).toHaveNoViolations();
  });
});
