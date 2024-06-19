import { render } from '../../tests/utils';
import Radio from '../Radio/Radio';
import { axe } from 'jest-axe';

describe('Radio Group', () => {
  test('renders correctly', async () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <Radio.Group
        name="RADIO_NAME"
        value="RADIO_GROUP_VALUE"
        onChange={onChange}
      >
        <Radio value="value 1" label="OPTION_Y" />
        <Radio value="value 2" label="OPTION_X" />
      </Radio.Group>
    );

    expect(getByLabelText('OPTION_Y')).toBeInTheDocument();
  });

  test('passes a11y check', async () => {
    // Arrange
    const onChange = jest.fn();
    const { container } = render(
      <Radio.Group name="inputGroup" value="SOME_VALUE" onChange={onChange}>
        <Radio value="value 1" label="Option Y" />
        <Radio value="value 2" label="Option X" />
      </Radio.Group>
    );
    const results = await axe(container);

    // Assert
    expect(results).toHaveNoViolations();
  });
});
