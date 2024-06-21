/** @jsxImportSource theme-ui */
import { ChangeEvent } from 'react';
import { RadioGroup } from '../RadioGroup/RadioGroup';
export interface RadioProps {
    /** The label content */
    label?: string;
    /** The value of the `input` element, required for a controlled component */
    value?: string;
    /** Callback fired when the value is changed */
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    /** If `true`, the `input` is required */
    required?: boolean;
    /** The id of the `input` element. Use this prop to make label and `helperText` accessible for screen readers */
    id?: string;
    /** Radio identification */
    name?: string;
}
declare const Radio: {
    ({ id, value, label, name, onChange, required, }: RadioProps): import("react").JSX.Element;
    Group: typeof RadioGroup;
};
export default Radio;
