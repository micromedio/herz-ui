import { HTMLAttributes } from 'react';
export interface EditableFieldTextProps {
    /** The text value and initial value of the `input` element */
    defaultValue: string;
    value: string;
    name?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    status?: 'error' | 'success' | 'loading';
    helperText?: string;
    onSave?: (value: string) => void;
    saveOnBlur?: boolean;
    resetOnBlur?: boolean;
    className?: HTMLAttributes<HTMLDivElement>['className'];
    controlsGroup?: boolean;
    multiline?: boolean;
    rows?: number;
    unit?: string;
}
declare const EditableText: import("react").ForwardRefExoticComponent<EditableFieldTextProps & import("react").RefAttributes<HTMLInputElement | HTMLTextAreaElement>>;
export default EditableText;
