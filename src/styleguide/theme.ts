import { Theme } from "theme-ui"

import { base } from "@theme-ui/presets"

export const theme: Theme = {
  ...base,
  colors: {
    background: "#FFF2F2", // light red bg
    text: "#86868B", // gray text
    accent: "#FC000A", // brand red
    highlight: "#0066CC", // links
    primary: "#FF3C3C", // primary button
    secondary: "#02BFFE", // hovers (brand blue)
  },

  styles: {
    ...base.styles,
  },
}
