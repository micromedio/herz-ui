/// <reference types="react" />
export default function useRadioGroup(): {
    name: string | undefined;
    value: string;
    onChange?: ((event: import("react").ChangeEvent<HTMLInputElement>) => void) | undefined;
    children?: import("react").ReactNode;
} | null;
