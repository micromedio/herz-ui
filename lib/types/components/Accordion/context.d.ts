/// <reference types="react" />
export interface AccordionContext {
    index: number;
    openIndex?: number;
    toggleOpen: (index: number) => void;
    activeBackgroundColor: 'primary' | 'secondary' | 'text' | 'success' | 'warning';
}
export declare const AccordionContext: import("react").Context<AccordionContext | null>;
export declare function useAccordionContext(): AccordionContext;
