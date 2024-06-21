/// <reference types="react" />
import { TippyProps } from '@tippyjs/react';
type LazyTippyProps = TippyProps & {
    alwaysRenderContent?: boolean;
};
declare const LazyTippy: import("react").ForwardRefExoticComponent<Omit<LazyTippyProps, "ref"> & import("react").RefAttributes<HTMLElement>>;
export default LazyTippy;
