import { Theme } from "theme-ui"

import { base } from "@theme-ui/presets"

export const theme: Theme = {
  ...base,
  space: Array(17).fill(0).map((_, i) => i*4),
  radii: Array(17).fill(0).map((_, i) => i*4),
  colors: {
    background: "#FFF2F2", // light red bg
    text: "#86868B", // gray text
    accent: "#FC000A", // brand red
    highlight: "#0066CC", // links
    primary: "#FF3C3C", // primary button
    secondary: "#02BFFE", // hovers (brand blue)
  },

  buttons: {
    primary: {
      color: "background",
      bg: "primary",
      "&:hover": {
        opacity: 0.7,
      },
      cursor: "pointer",
      transition: "all .3s linear",
    },
    secondary: {
      color: "background",
      bg: "secondary",
      "&:hover": {
        opacity: 0.7,
      },
      cursor: "pointer",
      transition: "all .3s linear",
    },
  },
  styles: {
    ...base.styles,
  },
}
