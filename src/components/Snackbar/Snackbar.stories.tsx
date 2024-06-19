/** @jsxImportSource theme-ui */
import Snackbar, { SnackbarProps } from './Snackbar';
import { Meta, Story } from '@storybook/react/types-6-0';
import SnackbarProvider from './context/SnackbarProvider';
import { Button } from '../';
import { useSnackbar } from './hooks/useSnackbar';
import { EnqueueSnackbarArguments } from './context/SnackbarContext';

export default {
  title: 'Design System/Snackbar',
  component: Snackbar,
} as Meta;

const Template: Story<SnackbarProps> = (props) => <Snackbar {...props} />;

// Each story then reuses that template
export const Example = Template.bind({});
Example.args = {
  type: 'success',
  title: 'Title!',
  body: 'Optional Body',
};

export const Success = Template.bind({});
Success.args = {
  type: 'success',
  title: 'Your file was uploaded!',
  body: (
    <span>
      The file <span sx={{ color: '#fff' }}>abcdef.jpg</span> was sucessfully
      uploaded
    </span>
  ),
};
export const Error = Template.bind({});
Error.args = {
  type: 'error',
  title: 'Something bad happened...',
};
export const Loading = Template.bind({});
Loading.args = {
  type: 'loading',
  title: 'Saving changes...',
};

const SnackbarController = (props: EnqueueSnackbarArguments) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return (
    <div
      sx={{
        '> *': {
          mt: 2,
        },
      }}
    >
      <h3>Control spawned snackbar with storybook controls</h3>
      <Button
        variant="plain"
        color="secondary"
        onClick={() => enqueueSnackbar(props)}
      >
        Add storybook snackbar
      </Button>
      <Button
        variant="plain"
        color="secondary"
        onClick={() =>
          enqueueSnackbar({
            title: 'Loading...',
            type: 'loading',
          })
        }
      >
        Add auto-hiding snackbar
      </Button>
      <Button
        variant="plain"
        color="secondary"
        onClick={() =>
          enqueueSnackbar({
            title: 'Server Error!',
            type: 'error',
            showClose: true,
            isPersistent: true,
          })
        }
      >
        Add closable permanent snackbar
      </Button>
      <Button variant="plain" onClick={() => closeSnackbar()}>
        Close Snackbars
      </Button>
    </div>
  );
};

const ProviderTemplate: Story<
  EnqueueSnackbarArguments & {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  }
> = ({
  horizontal,
  vertical,
  ...props
}: EnqueueSnackbarArguments & {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
}) => {
  return (
    <SnackbarProvider
      position={{
        horizontal,
        vertical,
      }}
    >
      <SnackbarController {...props} />
    </SnackbarProvider>
  );
};
export const WithProvider = ProviderTemplate.bind({});
WithProvider.argTypes = {
  vertical: {
    options: ['top', 'bottom'],
    control: { type: 'radio' },
  },
  horizontal: {
    options: ['left', 'center', 'right'],
    control: { type: 'radio' },
  },
};
WithProvider.args = {
  horizontal: 'right',
  vertical: 'bottom',
  autoHideDuration: 2000,
  body: 'Body',
  title: 'Title',
  type: 'success',
  isPersistent: false,
  showClose: true,
};
