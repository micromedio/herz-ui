import { Theme } from "theme-ui"

import { base } from "@theme-ui/presets"

export const theme: Theme = {
  ...base,
  space: Array.from({ length: 17 })
    .fill(0)
    .map((_, index) => index * 4), // results in [0, 4, 8, 12, ..., 60, 64]
  radii: Array.from({ length: 17 })
    .fill(0)
    .map((_, index) => index * 4), // results in [0, 4, 8, 12, ..., 60, 64]
  colors: {
    background: "#FFF2F2", // light red bg
    text: "#1D1D1F", // dark text
    muted: "#86868B", // gray text
    accent: "#FC000A", // brand red
    highlight: "#0066CC", // links
    primary: "#FF3C3C", // primary button
    secondary: "#02BFFE", // hovers (brand blue)
    low_emphasis: "#F5F5F7",
    medium_emphasis: "#F5F9FD",
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
      color: "text",
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
  },

  buttons: {
    filled: {
      cursor: "pointer",
      transition: "all .2s linear",
    },
    plain: {
      cursor: "pointer",
      transition: "all .3s linear",
    },
    disabled: {
      transition: "all .3s linear",
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
