import { render, screen, waitFor } from '../../tests/utils';
import { axe } from 'jest-axe';
import { Switch } from './Switch';
import userEvent from '@testing-library/user-event';

describe('Switch', () => {
  test('onChange is called when switch is clicked', async () => {
    // Arrange
    const onChange = jest.fn();
    render(<Switch checked onChange={onChange} label="TEST_SWITCH" />);

    // Assert
    expect(onChange).not.toHaveBeenCalled();
    await waitFor(() => userEvent.click(screen.getByRole('checkbox')));

    expect(onChange).toHaveBeenCalled();
  });

  test('passes a11y check', async () => {
    // Arrange
    const { container } = render(
      <Switch label="SWITCH_LABEL" id="SWITCH_ID" />
    );
    const results = await axe(container);

    // Assert
    expect(results).toHaveNoViolations();
  });
});
