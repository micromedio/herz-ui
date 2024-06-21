/** @jsxImportSource theme-ui */
import { ReactElement, ReactNode, Ref } from 'react';
import { ThemeUICSSObject } from 'theme-ui';
import { UseComboboxStateChange } from 'downshift';
import { ButtonProps } from '../Button/Button';
import { TagProps } from '../Tag/Tag';
interface CommonProps<T extends unknown> {
    /** An array of button props, each one corresponds to a Button rendered at the input end. */
    buttons?: ButtonProps[];
    /** The helper text content */
    helperText?: string;
    /** The id of the `input` element. Use this prop to make label and `helperText` accessible for screen readers */
    id?: string;
    /** The label content */
    label?: string;
    /** It basically returns the changes object of Combobox state with the input value, which must be used to filter the auto-complete options. */
    onInputValueChange: (comboboxStateChange: UseComboboxStateChange<T>) => void;
    /** Event triggered when the menu open or close */
    onIsOpenChange?: (isOpen?: boolean) => void;
    /** Text to show after label if field is not required (optional) */
    optionalText?: string;
    /** The Array with the options to be rendered */
    options: T[];
    /** It will return the string equivalent of the item which will be used for displaying the item in the <input> once selected */
    inputTag?: boolean;
    validationRegex?: RegExp;
    onKeyEnter?: (inputValue: string) => void;
    optionToString?: (option: T | null) => string;
    /** Placeholder text content */
    placeholder?: string;
    /** The function responsible to render the option, must return a ReactNode */
    renderOption: ({ highlightedIndex, defaultStyles, option, inputValue, index, array, }: {
        highlightedIndex: number;
        defaultStyles: ThemeUICSSObject;
        option: T;
        inputValue: string;
        index?: number;
        array?: T[];
    }) => ReactNode;
    /** If `true`, the `input` is required */
    required?: boolean;
    /** Text to show after label if field is required */
    requiredText?: string;
    /** Controls which state the `input` will be displayed in */
    status?: 'error' | 'loading' | 'success';
    styles?: {
        counterContainer?: ThemeUICSSObject;
        input?: ThemeUICSSObject;
        inputRoot?: ThemeUICSSObject;
        label?: ThemeUICSSObject;
        labelSideText?: ThemeUICSSObject;
        menu?: ThemeUICSSObject;
        root?: ThemeUICSSObject;
    };
    /** Responsible for rendering the `Currently showing x results from a total of y`, where y is the totalCount */
    totalCount?: number;
}
interface SingleProps<T extends unknown> extends CommonProps<T> {
    /** The value of the `input` element */
    defaultSelectedOption?: T;
    /** Whether the component is multiselect or not */
    multiSelect?: false;
    /** The value of the `input` element */
    selectedOption?: T | null;
    /** Callback fired when the selected item is changed */
    onSelectedItemChange: (changes?: T | null) => void;
    /** Renders the selected item as html */
    renderSelectedItem?: (option: T) => ReactNode;
}
interface MultiProps<T extends unknown> extends CommonProps<T> {
    /** The value of the `input` element */
    defaultSelectedOption?: T[];
    /** The function responsible for extracting the option label for the tags */
    getOptionLabel?: (option: T) => string;
    /** Clear the search input when select an option */
    keepSearchAfterSelect?: boolean;
    /** Whether the component is multiselect or not */
    multiSelect: true;
    /** The event handler for removing the Tag */
    onRemove?: (option: T) => void;
    /** Callback fired when the selected item is changed */
    onSelectedItemsChange: (changes: T[]) => void;
    onKeyEnter?: (inputValue: string) => void;
    /** Renders the selected items as html */
    renderSelectedItems?: (option: T[], isOpen?: boolean) => ReactNode;
    /** The value of the `input` element */
    selectedOption?: T[] | null;
    /** The Tag color passed to the Tag component */
    tagColor?: TagProps['color'];
}
export type AutocompleteProps<T extends unknown> = SingleProps<T> | MultiProps<T>;
declare const _default: <T extends unknown>(p: AutocompleteProps<T> & {
    ref?: Ref<HTMLInputElement>;
}) => ReactElement;
export default _default;
