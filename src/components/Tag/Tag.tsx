/** @jsxImportSource theme-ui */
import React from 'react';
import { get } from 'theme-ui';
import { IconX } from '@tabler/icons-react';

export interface TagProps {
  color?: 'primary' | 'secondary' | 'text' | 'success';
  children: React.ReactNode;
  onRemove?: () => void;
  showRemove?: boolean;
}

const Tag = ({
  color = 'secondary',
  children,
  onRemove,
  showRemove = false,
}: TagProps) => {
  return (
    <span
      sx={{
        alignItems: 'center',
        display: 'flex',
        height: 'fit-content',
        width: 'fit-content',
        gap: 1,
        px: 2,
        borderRadius: 2,
        color,
        backgroundColor: (t) => get(t, `colors.${color}.alpha.85`),
      }}
    >
      <span
        sx={{
          cursor: 'default',
          variant: 'text.caption',
          fontWeight: 'bold',
        }}
      >
        {children}
      </span>
      {showRemove && (
        <span
          tabIndex={0}
          role="button"
          aria-label="remove"
          onClick={onRemove}
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: 'text.40',
            cursor: 'pointer',
          }}
        >
          <IconX size={12} stroke={3} />
        </span>
      )}
    </span>
  );
};

export default Tag;
