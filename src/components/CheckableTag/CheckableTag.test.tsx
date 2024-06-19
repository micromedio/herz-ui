import '@testing-library/jest-dom';
import React, { useState } from 'react';
import { fireEvent, render } from '@testing-library/react';

import CheckableTag, { CheckableTagProps } from './CheckableTag';
import { axe } from 'jest-axe';

const CheckableTagTemplate = (props: CheckableTagProps) => {
  const [checked, setChecked] = useState(false);

  return (
    <CheckableTag
      checked={checked}
      onChange={() => setChecked((previous) => !previous)}
      {...props}
    />
  );
};

describe('CheckableTag', () => {
  it('can be checked', () => {
    const mockedFunction = jest.fn();
    const { getByRole } = render(
      <CheckableTagTemplate onChange={mockedFunction} />
    );

    const checkbox = getByRole('checkbox');

    expect(checkbox).toBeInTheDocument();

    fireEvent.click(checkbox);

    expect(mockedFunction).toHaveBeenCalled();
  });

  it('renders the label succesfully', () => {
    const label = 'Check me';
    const { getByText } = render(<CheckableTagTemplate label={label} />);

    expect(getByText(label)).toBeInTheDocument();
  });

  it('can be disabled', () => {
    const mockedFunction = jest.fn();
    const { getByRole } = render(
      <CheckableTagTemplate disabled={true} onChange={() => mockedFunction()} />
    );

    const checkbox = getByRole('checkbox');

    fireEvent.click(checkbox);

    expect(mockedFunction).not.toHaveBeenCalled();
  });
  it('passes a11y check', async () => {
    // Arrange
    const { container } = render(<CheckableTag label="Check me" />);
    const results = await axe(container);

    // Assert
    expect(results).toHaveNoViolations();
  });
});
