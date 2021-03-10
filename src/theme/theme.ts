import { HerzUITheme } from "theme-ui"
import { base } from "@theme-ui/presets"

import { generateColorsPalette, BaseColor } from "../helpers/colors"

export const DEFAULT_TINT_PERCENTAGES = [40, 90, 95, 97]
export const DEFAULT_SHADE_PERCENTAGES = [10]

const baseColors: Array<BaseColor> = [
  {
    name: "primary",
    color: "#FF3C3C" /** Red */,
    tintPercentages: DEFAULT_TINT_PERCENTAGES,
    alphaPercentages: DEFAULT_TINT_PERCENTAGES,
    shadePercentages: DEFAULT_SHADE_PERCENTAGES,
  },
  {
    name: "secondary",
    color: "#0082FC" /** Blue */,
    tintPercentages: DEFAULT_TINT_PERCENTAGES,
    alphaPercentages: DEFAULT_TINT_PERCENTAGES,
    shadePercentages: DEFAULT_SHADE_PERCENTAGES,
  },
  {
    name: "text",
    color: "#1D1D1D" /** Black */,
    tintPercentages: DEFAULT_TINT_PERCENTAGES,
    alphaPercentages: DEFAULT_TINT_PERCENTAGES,
    shadePercentages: DEFAULT_SHADE_PERCENTAGES,
  },
  {
    name: "success",
    color: "#30D158" /** Green */,
    tintPercentages: DEFAULT_TINT_PERCENTAGES,
    alphaPercentages: DEFAULT_TINT_PERCENTAGES,
    shadePercentages: DEFAULT_SHADE_PERCENTAGES,
  },
]

/** Generate color palette  */
const colorPalette = generateColorsPalette(baseColors)

export const theme: HerzUITheme = {
  ...base,
  space: Array.from({ length: 17 })
    .fill(0)
    .map((_, index) => index * 4), // results in [0, 4, 8, 12, ..., 60, 64]
  radii: Array.from({ length: 17 })
    .fill(0)
    .map((_, index) => index * 4), // results in [0, 4, 8, 12, ..., 60, 64]
  colors: {
    background: "#F9F9F9", // light gray bg
    primary: colorPalette.primary,
    secondary: colorPalette.secondary,
    text: colorPalette.text,
    success: colorPalette.success,
  },

  // Typography
  fonts: {
    body: "Gilroy",
  },

  fontSizes: {
    large: 18,
    medium: 15,
    base: 14,
    small: 13,
    xsmall: 12,
  },

  fontWeights: {
    bold: 700,
    semibold: 600,
    medium: 500,
  },

  lineHeights: {
    body: 20 / 14,
  },

  text: {
    default: {
      fontFamily: "body",
      color: "text.0",
    },
    secondary: {
      color: "secondary.0",
      fontSize: 14,
      lineHeight: 1.45,
    },
    heading1: {
      fontFamily: "body",
      fontSize: "large",
      fontWeight: "bold",
      lineHeight: 36 / 18, // 36px
      letterSpacing: "-2%",
    },
    heading2: {
      fontFamily: "body",
      fontSize: "medium",
      fontWeight: "semibold",
      lineHeight: 24 / 15, // 24px
    },
    heading3: {
      fontFamily: "body",
      fontSize: "base",
      fontWeight: "semibold",
      lineHeight: "body",
    },
    heading4: {
      fontFamily: "body",
      fontSize: "small",
      fontWeight: "semibold",
      lineHeight: 20 / 13, // 20px
    },

    body1: {
      fontFamily: "body",
      fontSize: "base",
      fontWeight: "medium",
      lineHeight: "body",
    },
    body2: {
      fontFamily: "body",
      fontSize: "small",
      fontWeight: "medium",
      lineHeight: 20 / 13, // 20px
    },
    body3: {
      fontFamily: "body",
      fontSize: "small",
      fontWeight: "medium",
      lineHeight: 16 / 13, // 16px
    },
    caption: {
      fontFamily: "body",
      fontSize: "xsmall",
      fontWeight: "medium",
      lineHeight: 20 / 12, // 20px
    },
    button1: {
      fontFamily: "body",
      fontSize: "base",
      fontWeight: "semibold",
      lineHeight: "body",
    },
  },

  styles: {
    ...base.styles,
    root: {
      fontFamily: "body",
      fontSize: "base",
      fontWeight: "medium",
      lineHeight: "body",
    },
  },
}
