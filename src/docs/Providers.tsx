/** @jsxImportSource theme-ui */
import ThemeWrapper from '../theme/ThemeWrapper';
import SnackbarProvider from '../components/Snackbar/context/SnackbarProvider';

export interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeWrapper>
      <SnackbarProvider>{children}</SnackbarProvider>
    </ThemeWrapper>
  );
};

export default Providers;
