/** @jsxImportSource theme-ui */
import React, { forwardRef, HTMLAttributes, useMemo } from 'react';

export interface PaperProps {
  /** Paper elevation */
  elevation?: number;
  /** Paper inside padding */
  padding?: number;
  /** The content of the component */
  children?: React.ReactNode;
  className?: HTMLAttributes<HTMLDivElement>['className'];
  onClick?: HTMLAttributes<HTMLDivElement>['onClick'];
}

const Paper = forwardRef<HTMLDivElement, PaperProps>(function PaperWithRef(
  { elevation = 1, padding = 6, children, className, onClick }: PaperProps,
  ref
) {
  const boxShadow = useMemo(() => {
    if (elevation === 1) return 'main';
    if (elevation >= 2) return 'dark';

    return 'none';
  }, [elevation]);

  return (
    <div
      ref={ref}
      sx={{
        p: padding,
        borderRadius: 4,
        boxShadow,
        backgroundColor: '#FFF',
      }}
      className={className}
      onClick={onClick}
    >
      {children}
    </div>
  );
});

export default Paper;
