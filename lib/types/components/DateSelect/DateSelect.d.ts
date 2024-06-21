/// <reference types="react" />
import { SelectProps } from '../Select/Select';
import { SelectOptionProps } from '../Select/SelectOption';
interface DateValue {
    to: string;
    from: string;
}
export interface DateSelectProps {
    /** The id of the DateSelectProps. Use this prop to make label and `helperText` accessible for screen readers */
    id?: SelectProps['id'];
    /** Label text to be placed before the element */
    label?: SelectProps['label'];
    /** The placeholder text, shown when there is no selected value */
    placeholder?: SelectProps['placeholder'];
    /** The value of the `select` element, required for a controlled component */
    value?: DateValue;
    /** Default value which will not trigger the `filled` select state */
    defaultValue?: DateValue;
    /** Whether the component is disabled or not */
    disabled?: SelectProps['disabled'];
    /** Callback fired when the value is changed */
    onChange?: (changes: DateValue) => void;
    /** Highlight the select when it's in a `filled` state */
    highlightFilled?: SelectProps['highlightFilled'];
    /** Select grows to fill the width of the parent */
    fullWidth?: SelectProps['fullWidth'];
    children: SelectProps['children'];
    /** Format in which the date should be in, defaults to 'MM/dd/yyyy' */
    dateFormat?: string;
    /** Hides custom date option if `true` */
    hideCustom?: boolean;
}
declare const DateSelect: {
    ({ id, label, placeholder, value, defaultValue, disabled, onChange, highlightFilled, hideCustom, fullWidth, children, dateFormat, }: DateSelectProps): import("react").JSX.Element;
    Option: {
        (props: SelectOptionProps<DateValue>): import("react").JSX.Element;
        isSelectOption: boolean;
    };
};
export default DateSelect;
