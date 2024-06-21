/** @jsxImportSource theme-ui */
import { ChangeEvent, FocusEvent } from 'react';
import { SelectProps } from '../Select/Select';
import { InputProps } from '../Input/Input';
interface BaseTextFieldProps {
    /** Input type */
    type?: HTMLInputElement['type'];
    /** The label content */
    label?: string;
    /** Placeholder text content */
    placeholder?: string;
    /** The helper text content */
    helperText?: string;
    /** Controls which state the `input` will be displayed in */
    state?: 'default' | 'error' | 'success';
    /** If `true`, the `input` element will be disabled */
    disabled?: boolean;
    /** If `true`, the `input` is required */
    required?: boolean;
    /** If `true`, the component is read only, used only to display data */
    readOnly?: boolean;
    /** Text to show after label if field is required */
    requiredText?: string;
    /** Text to show after label if field is not required (optional) */
    optionalText?: string;
    /** The id of the `input` element. Use this prop to make label and `helperText` accessible for screen readers */
    id?: string;
    /** Text at the end of the input */
    unit?: string;
    iconName?: InputProps['iconName'];
    /** Will render a textarea instead of an input if `true` */
    multiline?: boolean;
    /** If true, the textarea will grow as the user types */
    autoExpand?: boolean;
    /** Number of textarea cols */
    cols?: number;
    /** Number of textarea rows */
    rows?: number;
    /** Input form id */
    form?: string;
}
interface InputTextFieldProps extends BaseTextFieldProps {
    /** The value of the `input` element, required for a controlled component */
    value?: string;
    /** Callback fired when the value is changed */
    onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    /** Callback fired when the input is unfocused */
    onBlur?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    /** Will render a Select instead of an Input if `true` */
    select?: false;
}
interface SelectTextFieldProps extends BaseTextFieldProps {
    /** Will render a Select instead of an Input if `true` */
    select: true;
    /** Props passed to the Select component when `select` is `true` */
    selectProps: Omit<SelectProps, 'fullWidth' | 'hightlightFilled' | 'children'>;
    children: SelectProps['children'];
}
export type TextFieldProps = InputTextFieldProps | SelectTextFieldProps;
declare const TextField: import("react").ForwardRefExoticComponent<TextFieldProps & import("react").RefAttributes<HTMLInputElement | HTMLTextAreaElement>>;
export default TextField;
