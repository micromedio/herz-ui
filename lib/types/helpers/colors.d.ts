import * as CSS from 'csstype';
export type BaseColor = {
    name: string;
    /** Color hexadecimal */
    color: CSS.Property.Color;
    /** Array of tint percentages to be generated */
    tintPercentages: Array<number>;
    /** Array of shade percentages to be generated */
    shadePercentages: Array<number>;
    /** Array of alpha percentages to be generated */
    alphaPercentages: Array<number>;
};
export type PaletteColors = {
    [key: string]: GeneratedColors;
};
export type GeneratedColors = {
    /** Generated tint variations */
    __default: CSS.Property.Color;
    [key: number]: CSS.Property.Color;
    alpha: {
        /** Generated alpha variations */
        [key: number]: CSS.Property.Color;
    };
    shade: {
        /** Generated alpha variations */
        [key: number]: CSS.Property.Color;
    };
};
/**
 * Generates tints and alphas from pre-defined baseColors.
 * Tints are colors mixed with white.
 */
export declare function generateColorsPalette(baseColors: BaseColor[]): PaletteColors;
