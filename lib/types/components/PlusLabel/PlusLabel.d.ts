/// <reference types="react" />
export interface PlusLabelProps {
    labels: string[];
    tooltip: string;
    customTooltip?: React.ReactNode;
}
export default function PlusLabel({ tooltip, labels, customTooltip, }: PlusLabelProps): import("react").JSX.Element;
