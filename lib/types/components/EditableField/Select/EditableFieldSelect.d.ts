/// <reference types="react" />
import { SelectProps } from '../../Select/Select';
import { SelectOption } from '../../Select/SelectOption';
export interface EditableFieldSelectProps extends Omit<SelectProps, 'label'> {
    name?: string;
    status?: 'error' | 'success' | 'loading';
    helperText?: string;
    onSave?: (value: SelectProps['value'] | SelectProps['selectedItems']) => void;
    saveOnBlur?: boolean;
    resetOnBlur?: boolean;
    controlsGroup?: boolean;
}
declare const EditableFieldSelect: {
    ({ name, status, helperText, onSave, saveOnBlur, resetOnBlur, controlsGroup, children, ...selectProps }: EditableFieldSelectProps): import("react").JSX.Element;
    Option: typeof SelectOption;
};
export default EditableFieldSelect;
