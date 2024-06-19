import { ChangeEvent, createContext, ReactNode } from 'react';

const RadioGroupContext = createContext<{
  name: string | undefined;
  value: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode;
} | null>(null);

RadioGroupContext.displayName = 'RadioGroupContext';

export default RadioGroupContext;
