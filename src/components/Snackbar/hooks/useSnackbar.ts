import { useContext } from 'react';
import { SnackbarContext } from '../context/SnackbarContext';

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (context === null) {
    throw 'Could not find SnackbarContext, please use the SnackbarProvider';
  }

  return context;
};
