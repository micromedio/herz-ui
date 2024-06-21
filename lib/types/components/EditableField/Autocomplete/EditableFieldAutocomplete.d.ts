/// <reference types="react" />
import { AutocompleteProps } from '../../Autocomplete/Autocomplete';
export type EditableFieldAutocompleteProps<T> = AutocompleteProps<T> & {
    name?: string;
    status?: 'error' | 'success' | 'loading';
    helperText?: string;
    onSave?: (value: AutocompleteProps<T>['selectedOption']) => void;
    controlsGroup?: boolean;
};
declare const EditableFieldAutocomplete: <T extends unknown>({ name, status, helperText, onSave, controlsGroup, ...autocompleteProps }: EditableFieldAutocompleteProps<T>) => import("react").JSX.Element;
export default EditableFieldAutocomplete;
