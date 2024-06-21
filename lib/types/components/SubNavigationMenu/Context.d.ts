/// <reference types="react" />
interface SubNavigationMenuContextData {
    isCollapsed: boolean;
    collapsedHidden: boolean;
}
export declare const SubNavigationMenuContext: import("react").Context<SubNavigationMenuContextData | null>;
export declare const useSubNavigationMenu: () => SubNavigationMenuContextData | null;
export {};
