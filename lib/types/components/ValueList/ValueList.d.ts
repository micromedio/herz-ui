/** @jsxImportSource theme-ui */
import React, { HTMLAttributes } from 'react';
export interface ValueListProps {
    alignValues?: 'start' | 'end';
    className?: HTMLAttributes<HTMLDivElement>['className'];
    itemSpacing?: '12px' | '16px';
    items: Array<{
        label: React.ReactNode;
        value: React.ReactNode;
    }>;
}
/**
 * @deprecated Component depracated, use `ValuesList` instead
 */
declare const ValueList: ({ alignValues, className, itemSpacing, items, }: ValueListProps) => React.JSX.Element;
export default ValueList;
