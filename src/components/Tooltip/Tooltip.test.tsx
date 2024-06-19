import { render, screen, waitFor } from '../../tests/utils';
import Tooltip from './Tooltip';
import userEvent from '@testing-library/user-event';

describe('Tooltip', () => {
  test('tooltip shows on hover', async () => {
    render(
      <Tooltip title="TOOLTIP_TITLE">
        <button>BUTTON_TEXT</button>
      </Tooltip>
    );

    expect(screen.queryByText('TOOLTIP_TITLE')).not.toBeInTheDocument();
    userEvent.hover(screen.getByRole('button', { name: 'BUTTON_TEXT' }));
    await waitFor(() =>
      expect(screen.getByText('TOOLTIP_TITLE')).toBeInTheDocument()
    );
  });

  test('renders the children succesfully', async () => {
    render(
      <Tooltip title="Title">
        <button>hover me</button>
      </Tooltip>
    );

    expect(screen.getByText('hover me')).toBeInTheDocument();
  });
});
