import { Theme } from "theme-ui"

import { base } from "@theme-ui/presets"

export const theme: Theme = {
  ...base,
  space: Array.from({ length: 17 })
    .fill(0)
    .map((_, index) => index * 4),
  radii: Array.from({ length: 17 })
    .fill(0)
    .map((_, index) => index * 4),
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
