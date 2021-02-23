import { tint } from "polished"

export type BaseColor = {
  name: string
  /** Color hexadecimal */
  color: string
  /** Array of tints percentage to be generated */
  tintPercentages: Array<number>
}

export type PaletteColors = {
  [key: string]: Array<string>
}

/**
 * Generates tints from pre-defined baseColors.
 * Tints are colors mixed with white.
 */
function generateColorsPalette(baseColors: BaseColor[]): PaletteColors {
  const generatedPalette: PaletteColors = {}

  baseColors.map((baseColor) => {
    const { tintPercentages, name, color } = baseColor

    const generatedTints = tintPercentages.map((percentage) => {
      const tintedBaseColor = tint(percentage, color)

      return tintedBaseColor
    })

    generatedPalette[name] = generatedTints
  })

  return generatedPalette
}

export { generateColorsPalette }
