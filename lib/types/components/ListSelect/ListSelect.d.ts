/** @jsxImportSource theme-ui */
import { ReactNode } from 'react';
type SelectOption = {
    label: ReactNode;
    value: string | number;
    affix?: ReactNode;
    suffix?: ReactNode;
};
export interface ListSelectProps {
    options: Array<SelectOption>;
    selected?: SelectOption['value'] | Array<SelectOption['value']>;
    onSelect?: (value: SelectOption['value']) => void;
    onDeselect?: (value: SelectOption['value']) => void;
}
declare const ListSelect: ({ options, selected, onSelect, onDeselect, }: ListSelectProps) => import("react").JSX.Element;
export default ListSelect;
