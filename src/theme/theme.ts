import { Theme } from 'theme-ui';
import { base } from '@theme-ui/presets';

import { generateColorsPalette, BaseColor } from '../helpers/colors';

export const DEFAULT_TINT_PERCENTAGES = [40, 70, 85, 90, 95, 97];
export const DEFAULT_SHADE_PERCENTAGES = [10];

const baseColors: Array<BaseColor> = [
  {
    name: 'primary',
    color: '#FF3C3C' /** Red */,
    tintPercentages: DEFAULT_TINT_PERCENTAGES,
    alphaPercentages: DEFAULT_TINT_PERCENTAGES,
    shadePercentages: DEFAULT_SHADE_PERCENTAGES,
  },
  {
    name: 'secondary',
    color: '#0082FC' /** Blue */,
    tintPercentages: DEFAULT_TINT_PERCENTAGES,
    alphaPercentages: DEFAULT_TINT_PERCENTAGES,
    shadePercentages: DEFAULT_SHADE_PERCENTAGES,
  },
  {
    name: 'text',
    color: '#1D1D1D' /** Black */,
    tintPercentages: DEFAULT_TINT_PERCENTAGES,
    alphaPercentages: DEFAULT_TINT_PERCENTAGES,
    shadePercentages: DEFAULT_SHADE_PERCENTAGES,
  },
  {
    name: 'success',
    color: '#30D158' /** Green */,
    tintPercentages: DEFAULT_TINT_PERCENTAGES,
    alphaPercentages: DEFAULT_TINT_PERCENTAGES,
    shadePercentages: DEFAULT_SHADE_PERCENTAGES,
  },
  {
    name: 'warning',
    color: '#FFE927' /** Yellow */,
    tintPercentages: DEFAULT_TINT_PERCENTAGES,
    alphaPercentages: DEFAULT_TINT_PERCENTAGES,
    shadePercentages: DEFAULT_SHADE_PERCENTAGES,
  },
  {
    name: 'highlight',
    color: '#FEFF99' /** Yellow */,
    tintPercentages: DEFAULT_TINT_PERCENTAGES,
    alphaPercentages: DEFAULT_TINT_PERCENTAGES,
    shadePercentages: DEFAULT_SHADE_PERCENTAGES,
  },
];

/** Generate color palette  */
const colorPalette = generateColorsPalette(baseColors);

export const theme: Theme = {
  ...base,
  space: Array.from({ length: 17 })
    .fill(0)
    .map((_, index) => index * 4), // results in [0, 4, 8, 12, ..., 60, 64]
  radii: Array.from({ length: 17 })
    .fill(0)
    .map((_, index) => index * 4), // results in [0, 4, 8, 12, ..., 60, 64]
  colors: {
    background: '#F9F9F9', // light gray bg
    primary: colorPalette.primary,
    secondary: colorPalette.secondary,
    text: colorPalette.text,
    success: colorPalette.success,
    warning: colorPalette.warning,
    highlight: colorPalette.highlight,
  },
  breakpoints: ['64rem'],

  // Typography
  fonts: {
    body: 'Herz, Gilroy',
  },

  fontSizes: [12, 13, 14, 15, 16, 18, 20],

  fontWeights: {
    bold: 700,
    semibold: 600,
    medium: 500,
  },

  lineHeights: {
    /**
     * With the division we achieve a unitless value
     * this is better for acessibility for people with cognitive concerns,
     * when the page is zoomed the unitless value with allow the line-height
     * to scale proportionately
     * more in: https://developer.mozilla.org/en-US/docs/Web/CSS/line-height#accessibility_concerns
     *  */
    body: 20 / 14,
  },

  shadows: {
    main: `0px 1px 12px ${colorPalette.text.alpha['95']}`,
    dark: `0px 1px 12px ${colorPalette.text.alpha['85']}`,
  },
  text: {
    default: {
      fontFamily: 'body',
      color: 'text',
    },
    heading1: {
      fontFamily: 'body',
      fontSize: [6, 5],
      fontWeight: 'bold',
      lineHeight: [40 / 20, 36 / 18],
      letterSpacing: '-0,023rem',
    },
    heading2: {
      fontFamily: 'body',
      fontSize: [4, 3],
      fontWeight: 'medium',
      lineHeight: [24 / 16, 24 / 15],
    },
    heading3: {
      fontFamily: 'body',
      fontSize: 2,
      fontWeight: 'semibold',
      lineHeight: 'body',
    },
    heading4: {
      fontFamily: 'body',
      fontSize: 1,
      fontWeight: 'medium',
      lineHeight: 20 / 13,
    },

    body1: {
      fontFamily: 'body',
      fontSize: [4, 2],
      fontWeight: 'medium',
      lineHeight: [24 / 16, 20 / 14],
    },
    body2: {
      fontFamily: 'body',
      fontSize: [2, 1],
      fontWeight: 'medium',
      lineHeight: [24 / 14, 20 / 13],
    },
    body3: {
      fontFamily: 'body',
      fontSize: 2,
      fontWeight: 'medium',
      lineHeight: 16 / 13,
    },
    caption: {
      fontFamily: 'body',
      fontSize: [2, 0],
      fontWeight: ['medium', 'medium'],
      lineHeight: [24 / 14, 20 / 12],
    },
    button1: {
      fontFamily: 'body',
      fontSize: [4, 2],
      fontWeight: 'medium',
      lineHeight: [24 / 16, 20 / 14],
    },
  },

  styles: {
    root: {
      fontFamily: 'body',
      fontSize: 2,
      fontWeight: 'medium',
      lineHeight: 'body',
      '--reach-dialog': 1, // To remove warning from @reach/dialog, the dialog styles have been included directly into the DialogOverlay and DialogContent components, so we can avoid global .css imports
    },
  },
};
