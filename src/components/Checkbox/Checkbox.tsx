/** @jsxImportSource theme-ui */
import * as React from 'react';
import { IconCheck, IconMinus } from '@tabler/icons-react';

export interface ICheckboxProps {
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  id?: string;
  label?: React.ReactNode;
  name?: string;
  onChange?(event: React.ChangeEvent<HTMLInputElement>): void;
}

const stateStyles = {
  resting: {
    backgroundColor: 'text.alpha.95',
  },
  hover: {
    backgroundColor: 'text.alpha.90',
  },
  active: {
    backgroundColor: 'text.alpha.90',
  },
  filled: {
    backgroundColor: 'secondary.alpha.90',
  },
  filledHover: {
    backgroundColor: 'secondary.alpha.85',
  },
};

const Checkbox = React.forwardRef<HTMLInputElement, ICheckboxProps>(
  function Checkbox(props: ICheckboxProps, ref) {
    const {
      checked = false,
      disabled = false,
      indeterminate = false,
      id,
      label,
      name,
      onChange,
      ...restProps
    } = props;

    return (
      <div
        sx={{
          display: 'inline-flex',
          position: 'relative',
          alignItems: 'center',
          opacity: disabled ? 0.4 : 1,
          cursor: disabled ? 'auto' : 'pointer',
        }}
      >
        <input
          {...restProps}
          type="checkbox"
          id={id}
          name={name}
          onChange={(!disabled && onChange) || undefined}
          ref={(input) => {
            if (input) {
              input.checked = checked;
              input.indeterminate = indeterminate;
              input.disabled = disabled;

              if (ref) {
                if (typeof ref === 'function') {
                  ref(input);
                } else {
                  ref.current = input;
                }
              }
            }
          }}
          sx={{
            position: 'relative',
            width: 20,
            height: 20,
            appearance: 'none',
            borderRadius: 1,
            border: '2px solid transparent',
            outline: 'none',
            transition: 'all 0.2s',
            cursor: disabled ? 'auto' : 'pointer',

            ...(checked || indeterminate
              ? stateStyles.filled
              : stateStyles.resting),

            '&:hover': {
              ...(!disabled &&
                (checked || indeterminate
                  ? stateStyles.filledHover
                  : stateStyles.hover)),
            },

            '&:focus': {
              ...(!disabled &&
                (checked || indeterminate
                  ? stateStyles.filledHover
                  : stateStyles.active)),
            },

            '&:checked ~ div, &:indeterminate ~ div': {
              visibility: 'visible',
              opacity: 1,
            },
          }}
          role="checkbox"
        />
        <div
          sx={{
            position: 'absolute',
            visibility: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '20px',
            width: '20px',
            cursor: 'pointer',
            color: 'secondary',
            pointerEvents: 'none',
          }}
        >
          {(checked && <IconCheck size={12} stroke={4} />) ||
            (indeterminate && <IconMinus size={12} stroke={4} />) ||
            null}
        </div>

        {label && (
          <label
            sx={{
              marginLeft: 2,
              width: 'auto',
              cursor: disabled ? 'auto' : 'pointer',
              flexGrow: 1,
            }}
            htmlFor={id}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

export default Checkbox;
