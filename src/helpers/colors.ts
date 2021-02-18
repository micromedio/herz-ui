import Values from "values.js"

type BaseColors = {
  [key: string]: string
}

type PaletteColors = {
  [key: string]: Array<string>
}

/** How much tints must be generated from each color? */
const TINTS_QUANTITY = 100

/** Which tints must be used based on weight? (from 0 to ${TINTS_QUANTITY}) */
const TARGET_WEIGHTS = [39, 89, 94, 96]

const weight = Math.round(100 / TINTS_QUANTITY)

/**
 * Generates tints from pre-defined baseColors
 * Check out https://noeldelgado.github.io/shadowlord/ for reference
 */
function generateColorsPalette(baseColors: BaseColors) {
  const colorKeys = Object.keys(baseColors)

  const generatedPalette: PaletteColors = {}

  colorKeys.map((key) => {
    const colorValues = new Values(baseColors[key])
    const generatedColors = colorValues.tints(weight)

    const tints = TARGET_WEIGHTS.map((weightToBeUsed) => {
      return generatedColors[weightToBeUsed].hexString()
    })

    generatedPalette[key] = tints
  })

  return generatedPalette
}

export { generateColorsPalette }
