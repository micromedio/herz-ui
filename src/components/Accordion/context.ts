import { createContext, useContext } from 'react';

export interface AccordionContext {
  index: number;
  openIndex?: number;
  toggleOpen: (index: number) => void;
  activeBackgroundColor:
    | 'primary'
    | 'secondary'
    | 'text'
    | 'success'
    | 'warning';
}

export const AccordionContext = createContext<AccordionContext | null>(null);

export function useAccordionContext() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(
      'Accordion.Item needs to be wrapped in an Accordion component'
    );
  }
  return context;
}
