/// <reference types="react" />
export interface TabContext {
    index: number;
    openIndex?: number;
    panelId?: string;
    tabId?: string;
    toggleOpen: (index: number) => void;
}
export declare const TabContext: import("react").Context<TabContext | null>;
export declare function useTabContext(): TabContext;
