/** @jsxImportSource theme-ui */

import { HTMLAttributes } from 'react';

export interface DividerProps {
  className?: HTMLAttributes<HTMLHRElement>['className'];
  variant?: 'horizontal' | 'vertical';
}

const Divider = ({ className, variant = 'horizontal' }: DividerProps) => {
  switch (variant) {
    case 'vertical':
      return (
        <hr
          className={className}
          sx={{
            border: 'none',
            minWidth: '1px',
            maxWidth: '1px',
            height: 'auto',
            minHeight: '100%',
            margin: 0,
            flexShrink: 0,
            backgroundColor: 'text.90',
          }}
        />
      );
    default:
      return (
        <hr
          className={className}
          sx={{
            border: 'none',
            height: '1px',
            margin: 0,
            flexShrink: 0,
            backgroundColor: 'text.90',
          }}
        />
      );
  }
};

export default Divider;
