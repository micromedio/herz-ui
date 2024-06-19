/** @jsxImportSource theme-ui */
import EditableFieldAutocomplete, {
  EditableFieldAutocompleteProps,
} from './EditableFieldAutocomplete';
import { mockedOptions } from '../../Autocomplete/__mocks__/options';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';
import Highlight from '../../Highlight/Highlight';

export default {
  title: 'Design System/EditableField/Autocomplete',
  component: EditableFieldAutocomplete,
} as Meta;

type AutocompleteItem = typeof mockedOptions[0];

const Template: Story<EditableFieldAutocompleteProps<AutocompleteItem>> = (
  props: Partial<
    Omit<EditableFieldAutocompleteProps<AutocompleteItem>, 'multiSelect'>
  >
) => {
  const [items, setItems] = useState<AutocompleteItem[]>(mockedOptions);
  const [value, setValue] = useState<AutocompleteItem | null | undefined>(
    mockedOptions[0]
  );
  const [defaultValue, setDefaultValue] = useState<
    AutocompleteItem | undefined
  >(mockedOptions[0]);

  return (
    <EditableFieldAutocomplete<AutocompleteItem>
      {...props}
      buttons={
        props.buttons
          ? [
              {
                color: 'secondary',
                children: 'More info',
                onClick: () => {
                  alert('Clicked on more info!');
                },
                variant: 'plain',
              },
              {
                color: 'secondary',
                children: 'Clear',
                onClick: () => {
                  setValue(null);
                },
                variant: 'plain',
              },
            ]
          : undefined
      }
      defaultSelectedOption={defaultValue}
      onInputValueChange={({ inputValue }) => {
        setItems(
          mockedOptions.filter((option) =>
            inputValue
              ? option.label
                  .toLocaleLowerCase()
                  .startsWith(inputValue.toLocaleLowerCase())
              : true
          )
        );
      }}
      onSave={(newValue) => {
        props.onSave?.(newValue);
        setDefaultValue((newValue as AutocompleteItem) || null);
      }}
      onSelectedItemChange={(options) => {
        setValue(options);
      }}
      options={items.slice(0, 5)}
      optionToString={(option) =>
        option && !Array.isArray(option) ? option.label : ''
      }
      placeholder="Search by organization's name or handle"
      renderOption={({ defaultStyles, option }) => (
        <div
          sx={{
            ...defaultStyles,
            alignContent: 'center',
            alignItems: 'center',
            display: 'flex',
            padding: 2,
          }}
        >
          {option.label}
        </div>
      )}
      selectedOption={value}
      totalCount={items.length}
    />
  );
};

const MultiAutocompleteTemplate: Story<
  EditableFieldAutocompleteProps<AutocompleteItem>
> = (
  props: Omit<
    Partial<EditableFieldAutocompleteProps<AutocompleteItem>>,
    'multiSelect'
  >
) => {
  const [items, setItems] = useState<AutocompleteItem[]>(mockedOptions);
  const [value, setValue] = useState<AutocompleteItem[] | null | undefined>(
    (props.selectedOption as AutocompleteItem[]) || []
  );
  const [defaultValue, setDefaultValue] = useState<
    AutocompleteItem[] | undefined
  >((props.defaultSelectedOption as AutocompleteItem[]) || []);

  return (
    <EditableFieldAutocomplete<AutocompleteItem>
      {...props}
      defaultSelectedOption={defaultValue}
      getOptionLabel={(option) => option.label}
      multiSelect
      onInputValueChange={({ inputValue }) => {
        setItems(
          mockedOptions.filter((option) =>
            inputValue
              ? option.label
                  .toLocaleLowerCase()
                  .startsWith(inputValue.toLocaleLowerCase())
              : true
          )
        );
      }}
      onRemove={(option) => {
        setValue(value?.filter((selected) => selected.value !== option.value));
      }}
      onSave={(newValue) => {
        props.onSave?.(newValue);
        setDefaultValue(newValue as AutocompleteItem[]);
      }}
      onSelectedItemsChange={(options) => {
        setValue(options);
      }}
      options={items.slice(0, 5)}
      placeholder="Search by organization's name or handle"
      renderOption={({ defaultStyles, option, inputValue }) => (
        <div
          sx={{
            ...defaultStyles,
            alignContent: 'center',
            alignItems: 'center',
            display: 'flex',
            padding: 2,
          }}
        >
          <Highlight search={inputValue} text={option.label} />
        </div>
      )}
      selectedOption={value}
      totalCount={items.length}
    />
  );
};

export const SingleSelect = Template.bind({});

export const MultiSelect = MultiAutocompleteTemplate.bind({});
