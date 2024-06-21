/// <reference types="react" />
import { SelectContext } from './context';
import { SelectValue } from './Select';
export interface SelectOptionCustomProps {
    value: SelectValue;
    children: ({ closeMenu, selectItem, }: Pick<SelectContext, 'closeMenu' | 'selectItem'>) => React.ReactNode;
    label?: React.ReactNode;
    disabled?: boolean;
    onHide?: () => void;
}
export declare const SelectOptionCustom: {
    ({ value, children, disabled, onHide, }: SelectOptionCustomProps): import("react").JSX.Element;
    isSelectOptionCustom: boolean;
};
