/// <reference types="react" />
export type { EditableFieldAutocompleteProps } from './Autocomplete/EditableFieldAutocomplete';
export type { EditableFieldGroupProps } from './Group/EditableFieldGroup';
export type { EditableFieldTextProps } from './Text/EditableFieldText';
export type { EditableFieldSelectProps } from './Select/EditableFieldSelect';
declare const EditableField: {
    Autocomplete: <T extends unknown>({ name, status, helperText, onSave, controlsGroup, ...autocompleteProps }: import("./Autocomplete/EditableFieldAutocomplete").EditableFieldAutocompleteProps<T>) => import("react").JSX.Element;
    Group: ({ children, onSave, saveOnBlur, resetOnBlur, status, }: import("./Group/EditableFieldGroup").EditableFieldGroupProps) => import("react/jsx-runtime").JSX.Element;
    Select: {
        ({ name, status, helperText, onSave, saveOnBlur, resetOnBlur, controlsGroup, children, ...selectProps }: import("./Select/EditableFieldSelect").EditableFieldSelectProps): import("react").JSX.Element;
        Option: typeof import("../Select/SelectOption").SelectOption;
    };
    Text: import("react").ForwardRefExoticComponent<import("./Text/EditableFieldText").EditableFieldTextProps & import("react").RefAttributes<HTMLInputElement | HTMLTextAreaElement>>;
};
export default EditableField;
