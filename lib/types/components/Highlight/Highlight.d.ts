/** @jsxImportSource theme-ui */
import React, { CSSProperties } from 'react';
export interface HighlightProps {
    /** The background color to the Highlight Component */
    backgroundColor?: CSSProperties['backgroundColor'];
    /** The Highlight Component string to be highlighted */
    search: string;
    /** The Highlight Component text to be rendered */
    text: string;
}
declare const Highlight: ({ backgroundColor, search, text, }: HighlightProps) => React.JSX.Element;
export default Highlight;
