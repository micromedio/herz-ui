import React from 'react';
import { DropzoneOptions } from 'react-dropzone';
export interface UploaderProps extends DropzoneOptions {
    name?: string;
    files?: File[];
    onChange?(files: File[]): void;
    children: React.ReactNode;
    showFiles?: boolean;
}
/**
 * Component responsible for rendering a file input that accept files through dragging or browsing.
 *
 * The form that uses the Uploader must provide the logic to upload the file(s).
 * Generally it is done through a form submit handler.
 *
 * The accepted files can be picked up through a controlled `files` prop
 * or the input element value.
 */
declare const Uploader: React.ForwardRefExoticComponent<UploaderProps & React.RefAttributes<HTMLInputElement>>;
export default Uploader;
