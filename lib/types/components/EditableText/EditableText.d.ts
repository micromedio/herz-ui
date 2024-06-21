import { HTMLAttributes } from 'react';
export interface EditableTextProps {
    /** The text value and initial value of the `input` element */
    defaultValue: string;
    value: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    status?: 'error' | 'success' | 'loading';
    helperText?: string;
    onSave?: (value: string) => void;
    saveOnBlur?: boolean;
    resetOnBlur?: boolean;
    className?: HTMLAttributes<HTMLDivElement>['className'];
}
/**
 * @deprecated Component depracated, use `EditableField.Text` instead
 */
declare const EditableText: import("react").ForwardRefExoticComponent<EditableTextProps & import("react").RefAttributes<HTMLInputElement>>;
export default EditableText;
