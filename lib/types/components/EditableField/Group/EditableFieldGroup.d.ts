import React from 'react';
export declare enum Actions {
    Focus = 0,
    Blur = 1,
    Reset = 2,
    Register = 3,
    Changed = 4
}
export interface EditableFieldGroupProps {
    children: React.ReactNode;
    onSave?: (values: Record<string, any>) => void;
    saveOnBlur?: boolean;
    resetOnBlur?: boolean;
    status?: 'error' | 'success' | 'loading';
}
declare const EditableFieldGroup: ({ children, onSave, saveOnBlur, resetOnBlur, status, }: EditableFieldGroupProps) => import("react/jsx-runtime").JSX.Element;
export default EditableFieldGroup;
