import { tint, transparentize } from "polished"

export type BaseColor = {
  name: string
  /** Color hexadecimal */
  color: string
  /** Array of tint percentages to be generated */
  tintPercentages: Array<number>
  /** Array of alpha percentages to be generated */
  alphaPercentages: Array<number>
}

export type PaletteColors = {
  [key: string]: generatedColors
}

type generatedColors = {
  /** Generated tint variations */
  [key: number]: string
  alpha: {
    /** Generated alpha variations */
    [key: number]: string
  }
}

/**
 * Generates tints from pre-defined baseColors.
 * Tints are colors mixed with white.
 */
function generateColorsPalette(baseColors: BaseColor[]): PaletteColors {
  const generatedPalette: PaletteColors = {}

  baseColors.forEach((baseColor) => {
    const { name, color, tintPercentages, alphaPercentages } = baseColor

    const generatedTints: generatedColors = {
      alpha: {},
    }

    tintPercentages.forEach((percentage) => {
      const tintedBaseColor = tint(percentage / 100, color)

      generatedTints[percentage] = tintedBaseColor
    })

    alphaPercentages.forEach((percentage) => {
      const alphaBaseColor = transparentize(percentage / 100, color)

      if (percentage > 0) {
        generatedTints.alpha[percentage] = alphaBaseColor
      }
    })

    generatedPalette[name] = generatedTints
  })

  return generatedPalette
}

export { generateColorsPalette }
