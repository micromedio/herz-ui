import React, { CSSProperties } from 'react';
import { render, screen } from '../../../tests/utils';
import { axe } from 'jest-axe';
import EditableAutocomplete from './EditableFieldAutocomplete';
import userEvent from '@testing-library/user-event';
import { mockedOptions } from '../../Autocomplete/__mocks__/options';

type AutocompleteItem = typeof mockedOptions[0];

const mockedClientRects = {
  bottom: 619.5,
  height: 265,
  left: 455.578_125,
  right: 783.578_125,
  top: 354.5,
  width: 328,
  x: 455.578_125,
  y: 354.5,
};

describe('EditableAutocomplete-Single', () => {
  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, 'getClientRects', {
      configurable: true,
      value: () => [mockedClientRects],
    });
  });

  test('value is shown', () => {
    // Arrange
    render(
      <EditableAutocomplete<AutocompleteItem>
        defaultSelectedOption={mockedOptions[0]}
        onInputValueChange={jest.fn()}
        onSave={jest.fn()}
        onSelectedItemChange={jest.fn()}
        options={mockedOptions.slice(0, 5)}
        optionToString={(option) => (option ? option.label : '')}
        placeholder="Search by organization's name or handle"
        renderOption={({ defaultStyles, option }) => (
          <div
            style={{
              ...(defaultStyles as CSSProperties),
              alignContent: 'center',
              alignItems: 'center',
              display: 'flex',
              padding: 2,
            }}
          >
            {option.label}
          </div>
        )}
        selectedOption={mockedOptions[0]}
        totalCount={mockedOptions.length}
      />
    );

    // Assert
    const option = screen.getByText('Neptunium');
    expect(option).toBeInTheDocument();
  });

  test('onSave is called when save button is clicked', async () => {
    // Arrange
    const onSave = jest.fn();
    render(
      <EditableAutocomplete<AutocompleteItem>
        defaultSelectedOption={mockedOptions[0]}
        onInputValueChange={jest.fn()}
        onSave={onSave}
        onSelectedItemChange={jest.fn()}
        options={mockedOptions.slice(0, 5)}
        optionToString={(option) => (option ? option.label : '')}
        placeholder="Search by organization's name or handle"
        renderOption={({ defaultStyles, option }) => (
          <div
            style={{
              ...(defaultStyles as CSSProperties),
              alignContent: 'center',
              alignItems: 'center',
              display: 'flex',
              padding: 2,
            }}
          >
            {option.label}
          </div>
        )}
        selectedOption={mockedOptions[1]}
        totalCount={mockedOptions.length}
      />
    );

    // Act
    expect(onSave).not.toHaveBeenCalled();
    userEvent.click(screen.getByLabelText('save'));

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith(mockedOptions[1]);
  });

  test('select value is reset when reset button is clicked', async () => {
    // Arrange
    const onSelectedItemChange = jest.fn();
    render(
      <EditableAutocomplete<AutocompleteItem>
        defaultSelectedOption={mockedOptions[0]}
        onInputValueChange={jest.fn()}
        onSave={jest.fn()}
        onSelectedItemChange={onSelectedItemChange}
        options={mockedOptions.slice(0, 5)}
        optionToString={(option) => (option ? option.label : '')}
        placeholder="Search by organization's name or handle"
        renderOption={({ defaultStyles, option }) => (
          <div
            style={{
              ...(defaultStyles as CSSProperties),
              alignContent: 'center',
              alignItems: 'center',
              display: 'flex',
              padding: 2,
            }}
          >
            {option.label}
          </div>
        )}
        selectedOption={mockedOptions[1]}
        totalCount={mockedOptions.length}
      />
    );

    // Act
    userEvent.click(screen.getByLabelText('reset'));

    // Assert
    expect(onSelectedItemChange).toHaveBeenCalledWith(mockedOptions[0]);
  });

  test('passes a11y check', async () => {
    // Arrange
    const { container } = render(
      <EditableAutocomplete<AutocompleteItem>
        defaultSelectedOption={mockedOptions[0]}
        onInputValueChange={jest.fn()}
        onSave={jest.fn()}
        onSelectedItemChange={jest.fn()}
        options={mockedOptions.slice(0, 5)}
        optionToString={(option) => (option ? option.label : '')}
        placeholder="Search by organization's name or handle"
        renderOption={({ defaultStyles, option }) => (
          <div
            style={{
              ...(defaultStyles as CSSProperties),
              alignContent: 'center',
              alignItems: 'center',
              display: 'flex',
              padding: 2,
            }}
          >
            {option.label}
          </div>
        )}
        selectedOption={mockedOptions[1]}
        totalCount={mockedOptions.length}
      />
    );
    const results = await axe(container);

    // Assert
    expect(results).toHaveNoViolations();
  });
});

describe('EditableAutocomplete-Multi', () => {
  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, 'getClientRects', {
      configurable: true,
      value: () => [mockedClientRects],
    });
  });

  test('value is shown', () => {
    // Arrange
    render(
      <EditableAutocomplete<AutocompleteItem>
        defaultSelectedOption={[
          mockedOptions[0],
          mockedOptions[1],
          mockedOptions[2],
        ]}
        getOptionLabel={(option) => (option ? option.label : '')}
        multiSelect
        onInputValueChange={jest.fn()}
        onSave={jest.fn()}
        onSelectedItemsChange={jest.fn()}
        options={mockedOptions.slice(0, 5)}
        placeholder="Search by organization's name or handle"
        renderOption={({ defaultStyles, option }) => (
          <div
            style={{
              ...(defaultStyles as CSSProperties),
              alignContent: 'center',
              alignItems: 'center',
              display: 'flex',
              padding: 2,
            }}
          >
            {option.label}
          </div>
        )}
        selectedOption={[mockedOptions[0], mockedOptions[1], mockedOptions[2]]}
        totalCount={mockedOptions.length}
      />
    );

    // Assert
    const option1 = screen.getByText('Neptunium');
    expect(option1).toBeInTheDocument();
    const option2 = screen.getByText('Plutonium');
    expect(option2).toBeInTheDocument();
    const option3 = screen.getByText('Americium Darmstad');
    expect(option3).toBeInTheDocument();
  });

  test('onSave is called when save button is clicked', async () => {
    // Arrange
    const onSave = jest.fn();
    render(
      <EditableAutocomplete<AutocompleteItem>
        defaultSelectedOption={[
          mockedOptions[0],
          mockedOptions[1],
          mockedOptions[2],
        ]}
        getOptionLabel={(option) => (option ? option.label : '')}
        multiSelect
        onInputValueChange={jest.fn()}
        onSave={onSave}
        onSelectedItemsChange={jest.fn()}
        options={mockedOptions.slice(0, 5)}
        placeholder="Search by organization's name or handle"
        renderOption={({ defaultStyles, option }) => (
          <div
            style={{
              ...(defaultStyles as CSSProperties),
              alignContent: 'center',
              alignItems: 'center',
              display: 'flex',
              padding: 2,
            }}
          >
            {option.label}
          </div>
        )}
        selectedOption={[mockedOptions[0], mockedOptions[1]]}
        totalCount={mockedOptions.length}
      />
    );

    // Act
    expect(onSave).not.toHaveBeenCalled();
    userEvent.click(screen.getByLabelText('save'));

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith([mockedOptions[0], mockedOptions[1]]);
  });

  test('select value is reset when reset button is clicked', async () => {
    // Arrange
    const onSelectedItemsChange = jest.fn();
    render(
      <EditableAutocomplete<AutocompleteItem>
        defaultSelectedOption={[
          mockedOptions[0],
          mockedOptions[1],
          mockedOptions[2],
        ]}
        getOptionLabel={(option) => (option ? option.label : '')}
        multiSelect
        onInputValueChange={jest.fn()}
        onSave={jest.fn()}
        onSelectedItemsChange={onSelectedItemsChange}
        options={mockedOptions.slice(0, 5)}
        placeholder="Search by organization's name or handle"
        renderOption={({ defaultStyles, option }) => (
          <div
            style={{
              ...(defaultStyles as CSSProperties),
              alignContent: 'center',
              alignItems: 'center',
              display: 'flex',
              padding: 2,
            }}
          >
            {option.label}
          </div>
        )}
        selectedOption={[mockedOptions[0], mockedOptions[1]]}
        totalCount={mockedOptions.length}
      />
    );

    // Act
    userEvent.click(screen.getByLabelText('reset'));

    // Assert
    expect(onSelectedItemsChange).toHaveBeenCalledWith([
      mockedOptions[0],
      mockedOptions[1],
      mockedOptions[2],
    ]);
  });

  test('passes a11y check', async () => {
    // Arrange
    const { container } = render(
      <EditableAutocomplete<AutocompleteItem>
        defaultSelectedOption={[
          mockedOptions[0],
          mockedOptions[1],
          mockedOptions[2],
        ]}
        getOptionLabel={(option) => (option ? option.label : '')}
        multiSelect
        onInputValueChange={jest.fn()}
        onSave={jest.fn()}
        onSelectedItemsChange={jest.fn()}
        options={mockedOptions.slice(0, 5)}
        placeholder="Search by organization's name or handle"
        renderOption={({ defaultStyles, option }) => (
          <div
            style={{
              ...(defaultStyles as CSSProperties),
              alignContent: 'center',
              alignItems: 'center',
              display: 'flex',
              padding: 2,
            }}
          >
            {option.label}
          </div>
        )}
        selectedOption={[mockedOptions[0], mockedOptions[1]]}
        totalCount={mockedOptions.length}
      />
    );
    const results = await axe(container);

    // Assert
    expect(results).toHaveNoViolations();
  });
});
