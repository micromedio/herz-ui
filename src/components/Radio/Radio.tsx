/** @jsxImportSource theme-ui */
import { ChangeEvent } from 'react';
import useRadioGroup from '../RadioGroup/hooks/useRadioGroup';
import { RadioGroup } from '../RadioGroup/RadioGroup';
export interface RadioProps {
  /** The label content */
  label?: string;
  /** The value of the `input` element, required for a controlled component */
  value?: string;
  /** Callback fired when the value is changed */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  /** If `true`, the `input` is required */
  required?: boolean;
  /** The id of the `input` element. Use this prop to make label and `helperText` accessible for screen readers */
  id?: string;
  /** Radio identification */
  name?: string;
}

const Radio = ({
  id,
  value,
  label,
  name,
  onChange,
  required = false,
}: RadioProps) => {
  const radioGroup = useRadioGroup();

  if (radioGroup) {
    if (typeof onChange === 'undefined') {
      onChange = radioGroup.onChange;
    }
    if (typeof name === 'undefined') {
      name = radioGroup.name;
    }
  }

  return (
    <label
      sx={{
        position: 'relative',
        display: 'flex',
        paddingLeft: '28px',
        margin: 2,
        overflow: 'auto',
        '&:hover input ~ span': {
          backgroundColor: 'secondary.90',
        },
      }}
    >
      {label}
      <input
        sx={{
          position: 'absolute',
          opacity: 0,
          cursor: 'pointer',
          height: 0,
          width: 0,
          display: 'flex',
          '&:checked + span': {
            backgroundColor: 'secondary.90',
            '&:after': {
              content: `""`,
              display: 'block',
              width: '8px',
              height: '8px',
              borderRadius: '8px',
              backgroundColor: 'secondary',
            },
          },
        }}
        id={id}
        type="radio"
        value={value}
        name={name}
        onChange={onChange}
        required={required}
        checked={radioGroup?.value === value}
      />
      <span
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '20px',
          width: '20px',
          borderRadius: '20px',
          backgroundColor: 'text.95',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    </label>
  );
};

Radio.Group = RadioGroup;
export default Radio;
