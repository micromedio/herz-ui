/** @jsxImportSource theme-ui */

import { HTMLAttributes, ReactNode } from 'react';

export interface ValueProps {
  children: ReactNode;
  className?: HTMLAttributes<HTMLDivElement>['className'];
}

export const Value = ({ children, className }: ValueProps) => {
  return (
    <div
      className={className}
      sx={{
        display: 'flex',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        color: 'text',
      }}
    >
      {children}
    </div>
  );
};
