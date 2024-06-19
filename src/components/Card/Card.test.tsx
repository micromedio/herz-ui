import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { render, screen } from '../../tests/utils';
import Card from './Card';

describe('Card', () => {
  test('title and children are rendered', () => {
    // Arrange
    render(<Card title="CARD_TITLE">CARD_CHILDREN</Card>);

    // Assert
    expect(screen.getByText('CARD_TITLE')).toBeInTheDocument();
    expect(screen.getByText('CARD_CHILDREN')).toBeInTheDocument();
  });

  test('action onClick is called when button is clicked', () => {
    const actions = [
      {
        label: 'FIRST_ACTION',
        onClick: jest.fn(),
      },
      {
        label: 'SECOND_ACTION',
        onClick: jest.fn(),
      },
    ];

    // Arrange
    render(
      <Card title="Capture interval" actions={actions}>
        Capturing every hour
      </Card>
    );

    userEvent.click(screen.getByRole('button', { name: 'FIRST_ACTION' }));
    expect(actions[0].onClick).toHaveBeenCalled();
    expect(actions[1].onClick).not.toHaveBeenCalled();
    userEvent.click(screen.getByRole('button', { name: 'SECOND_ACTION' }));
    expect(actions[1].onClick).toHaveBeenCalled();
  });

  test('passes a11y check', async () => {
    // Arrange
    const { container } = render(
      <Card
        title="Capture interval"
        actions={[
          {
            label: 'Change interval',
            onClick: jest.fn(),
          },
        ]}
      >
        Capturing every hour
      </Card>
    );
    const results = await axe(container);

    // Assert
    expect(results).toHaveNoViolations();
  });
});
