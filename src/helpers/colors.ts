import * as CSS from 'csstype';
import { shade, tint, transparentize } from 'polished';

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
export function generateColorsPalette(baseColors: BaseColor[]): PaletteColors {
  const generatedPalette: PaletteColors = {};

  baseColors.forEach((baseColor) => {
    const { name, color, tintPercentages, alphaPercentages, shadePercentages } =
      baseColor;

    const generatedTints: GeneratedColors = {
      __default: color,
      0: color,
      alpha: {},
      shade: {},
    };

    tintPercentages.forEach((percentage) => {
      const tintedBaseColor = tint(percentage / 100, color);

      generatedTints[percentage] = tintedBaseColor;
    });

    alphaPercentages.forEach((percentage) => {
      const alphaBaseColor = transparentize(percentage / 100, color);

      generatedTints.alpha[percentage] = alphaBaseColor;
    });

    shadePercentages.forEach((percentage) => {
      const shadeBaseColor = shade(percentage / 100, color);

      generatedTints.shade[percentage] = shadeBaseColor;
    });

    generatedPalette[name] = generatedTints;
  });

  return generatedPalette;
}
