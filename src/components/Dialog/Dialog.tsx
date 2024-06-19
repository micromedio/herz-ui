/** @jsxImportSource theme-ui */
import {
  DialogProps as ReachDialogProps,
  DialogContent,
  DialogOverlay,
} from '@reach/dialog';

export type DialogProps = ReachDialogProps;

const Dialog = ({ children, ...props }: DialogProps) => {
  return (
    <DialogOverlay
      {...props}
      sx={{
        backgroundColor: 'rgba(29, 29, 29, 0.6)',
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        overflow: 'auto',
        zIndex: 10,
      }}
    >
      <DialogContent
        aria-label="Modal"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',

          margin: '10vh auto',
          outline: 'none',

          p: 0,
          minHeight: '80vh',
          backgroundColor: 'transparent',
          width: 'fit-content',
        }}
        onClick={props.onDismiss}
      >
        <div onClick={(event) => event.stopPropagation()}>{children}</div>
      </DialogContent>
    </DialogOverlay>
  );
};

export default Dialog;
