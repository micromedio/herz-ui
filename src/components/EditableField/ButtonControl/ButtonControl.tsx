/** @jsxImportSource theme-ui */
import React, { MouseEvent, useMemo } from 'react';
import { ThemeUICSSObject } from 'theme-ui';
import Button from '../../Button/Button';
import Spinner from '../../Spinner/Spinner';
import { IconCheck, IconX } from '@tabler/icons-react';

export interface ButtonControlProps {
  isLoading?: boolean;
  showButtons?: boolean;
  onReset?: (event: MouseEvent<HTMLButtonElement>) => void;
  onSave?: () => void;
  children: React.ReactNode;
}

const ButtonControl = ({
  isLoading = false,
  showButtons = false,
  onReset,
  onSave,
  children,
}: ButtonControlProps) => {
  const buttonStyles: ThemeUICSSObject = useMemo(
    () => ({
      backgroundColor: '#FFF',
      boxShadow: 'dark',
      borderRadius: 2,

      '&:hover': {
        backgroundColor: 'text.alpha.95',
      },
    }),
    []
  );

  return (
    <div
      sx={{
        position: 'relative',
      }}
    >
      {children}

      {showButtons && (
        <div
          sx={{
            display: 'flex',
            position: 'absolute',
            top: '100%',
            right: 0,
            gap: 1,
            pt: 2,
            zIndex: 100,
          }}
        >
          {isLoading ? (
            <div
              sx={{
                display: 'flex',
                p: 1,
                ...buttonStyles,
                '&:hover': {},
              }}
            >
              <Spinner size={16} />
            </div>
          ) : (
            <React.Fragment>
              <Button
                size="small"
                color="text"
                iconComponent={IconX}
                aria-label="reset"
                onClick={onReset}
                sx={buttonStyles}
              />
              <Button
                size="small"
                color="text"
                iconComponent={IconCheck}
                aria-label="save"
                onClick={onSave}
                sx={buttonStyles}
              />
            </React.Fragment>
          )}
        </div>
      )}
    </div>
  );
};

export default ButtonControl;
