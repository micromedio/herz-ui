import { useContext } from 'react';
import RadioGroupContext from '../RadioGroupContext';

export default function useRadioGroup() {
  return useContext(RadioGroupContext);
}
