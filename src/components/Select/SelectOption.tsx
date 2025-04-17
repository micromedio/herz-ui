/** @jsxImportSource theme-ui */
import React from 'react';

import { useContext } from 'react';
import { SelectContext } from './context';
import { IconCheck } from '@tabler/icons-react';

import Checkbox from '../Checkbox/Checkbox';
import { SelectValue } from './Select';

export interface SelectOptionProps<T = SelectValue> {
  value: T;
  children?: React.ReactNode;
  disabled?: boolean;
}

export function SelectOption<T = SelectValue>({
  children,
  value,
  disabled = false,
}: SelectOptionProps<T>) {
  const context = useContext(SelectContext);
  if (context === null) {
    throw '<Select.Option> needs to be inside a <Select> component';
  }

  const {
    highlightedIndex,
    selectedItem,
    selectedItems = [],
    multi,
    getItemProps,
    index,
  } = context;

  const isMultiSelected = multi && selectedItems.includes(value as SelectValue);
  const isSelected = JSON.stringify(selectedItem) === JSON.stringify(value);

  return (
    <div
      key={`${value}${index}`}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        padding: 2,
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.3 : 1,
        borderRadius: 2,
        color: isMultiSelected ? 'text' : 'text.40',
        backgroundColor: '#fff',
        whiteSpace: 'nowrap',

        ...(highlightedIndex === index
          ? {
              color: 'text',
              backgroundColor: 'text.alpha.95',
            }
          : {}),

        ...(isSelected
          ? {
              color: 'secondary',
              backgroundColor: 'secondary.90',
              fontWeight: 'bold',
              ...(highlightedIndex === index
                ? {
                    backgroundColor: 'secondary.alpha.85',
                  }
                : {}),
            }
          : {}),
        transition: 'all .2s linear',
      }}
      {...getItemProps({
        item: value as SelectValue,
        index,
        disabled,
      })}
    >
      {multi ? (
        <Checkbox checked={isMultiSelected} label={children} />
      ) : (
        <React.Fragment>
          <span>{children}</span>
          <div
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: 20,
              height: 20,
              p: 1,
            }}
          >
            {isSelected && <IconCheck size={12} stroke={4} />}
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
SelectOption.isSelectOption = true;
