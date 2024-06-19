/** @jsxImportSource theme-ui */

import { forwardRef, useEffect, useState } from 'react';

export interface SwitchProps {
  checked?: boolean;
  disabled?: boolean;
  color?: 'primary' | 'secondary' | 'text' | 'success' | 'warning';
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: React.ReactNode;
  name?: string;
  id?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  {
    checked: controlledChecked,
    color = 'success',
    disabled = false,
    onChange,
    label,
    name,
    id,
  }: SwitchProps,
  ref
) {
  const [checked, setChecked] = useState(controlledChecked);
  useEffect(() => setChecked(controlledChecked), [controlledChecked]);

  return (
    <div
      sx={{
        display: 'flex',
        gap: 2,
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.4 : 1,
      }}
    >
      <div
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 20,
          width: 40,
          borderRadius: 3,
          backgroundColor: checked ? color : 'text.90',
          position: 'relative',
          transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        }}
      >
        <input
          ref={ref}
          type="checkbox"
          name={name}
          id={id}
          checked={checked}
          onChange={(event) => {
            if (onChange) onChange?.(event);
            else setChecked(event.target.checked);
          }}
          disabled={disabled}
          sx={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            cursor: 'inherit',
            m: 0,
            p: 0,
            opacity: 0,
            zIndex: 1,
          }}
        />
        <div
          sx={{
            height: 16,
            width: 16,
            borderRadius: 3,
            backgroundColor: '#FFF',
            position: 'absolute',
            left: '2px',
            transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            transform: checked ? 'translateX(20px)' : null,
          }}
        />
      </div>
      {label && (
        <label id={`label-${id}`} htmlFor={id}>
          {label}
        </label>
      )}
    </div>
  );
});
