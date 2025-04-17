/** @jsxImportSource theme-ui */

import { useMemo } from 'react';
import Button from '../Button/Button';
import Spinner from '../Spinner/Spinner';
import { IconCircleCheck, IconCircleX, IconX } from '@tabler/icons-react';

export interface SnackbarProps {
  type: 'success' | 'error' | 'loading';
  title: string;
  body?: React.ReactNode;
  onClose?: () => void;
  position?: {
    horizontal: 'left' | 'center' | 'right';
    vertical: 'top' | 'bottom';
  };
}

const Snackbar = ({ type, title, body, onClose, position }: SnackbarProps) => {
  const typeIcon = useMemo(() => {
    switch (type) {
      case 'success':
        return (
          <IconCircleCheck
            size={20}
            sx={{
              fill: 'success',
            }}
          />
        );
      case 'error':
        return (
          <IconCircleX
            size={20}
            sx={{
              fill: 'primary',
            }}
          />
        );
      case 'loading':
        return <Spinner size={20} color="secondary" />;
    }
  }, [type]);

  return (
    <div
      sx={{
        animation: 'moves  0.3s  ease-out 1',
        '@keyframes moves': {
          from: {
            ...(position?.horizontal === 'right' && {
              right: '-4rem',
            }),
            ...(position?.horizontal === 'left' && {
              left: '-4rem',
            }),
          },
          to: {
            ...(position?.horizontal === 'right' && {
              right: '0rem',
            }),
            ...(position?.horizontal === 'left' && {
              left: '0rem',
            }),
          },
        },
        display: 'grid',
        position: 'relative',
        gridTemplateAreas: `
          "icon title close"
          ${body ? `"icon body close"` : ''}
        `,
        gridTemplateColumns: 'auto 1fr auto',
        rowGap: 2,
        columnGap: 3,
        padding: 3,
        width: 'fit-content',
        backgroundColor: 'text',
        boxShadow: 'dark',
        borderRadius: 3,
        color: 'text.40',
      }}
    >
      <div
        sx={{
          display: 'flex',
          gridArea: 'icon',
          color: 'text',
        }}
      >
        {typeIcon}
      </div>

      <div
        sx={{
          gridArea: 'title',
          color: '#fff',
          variant: 'text.heading3',
        }}
      >
        {title}
      </div>

      {body && (
        <div
          sx={{
            gridArea: 'body',
          }}
        >
          {body}
        </div>
      )}

      {onClose && (
        <div
          sx={{
            gridArea: 'close',
          }}
        >
          <Button
            iconComponent={IconX}
            size="small"
            aria-label="close"
            sx={{
              p: 0,
              width: 20,
              height: 20,
              color: '#fff',
              backgroundColor: 'transparent',
              '&&:hover': {
                backgroundColor: 'text.70',
              },
              '> svg': {
                width: 20,
                height: 20,
              },
            }}
            onClick={onClose}
          />
        </div>
      )}
    </div>
  );
};

export default Snackbar;
