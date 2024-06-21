/** @jsxImportSource theme-ui */
import { HTMLAttributes, ReactNode } from 'react';
export interface ValuesListProps {
    alignValues?: 'start' | 'end';
    className?: HTMLAttributes<HTMLDivElement>['className'];
    itemSpacing?: '12px' | '16px';
    children: ReactNode;
}
declare const ValuesList: {
    ({ alignValues, className, children, itemSpacing, }: ValuesListProps): import("react").JSX.Element;
    Item: ({ children, hideDivider }: import("./Item").ItemProps) => import("react").JSX.Element;
    Label: ({ children, className }: import("./Label").LabelProps) => import("react").JSX.Element;
    Value: ({ children, className }: import("./Value").ValueProps) => import("react").JSX.Element;
};
export default ValuesList;
