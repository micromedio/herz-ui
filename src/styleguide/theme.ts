import { Theme } from "theme-ui"

import { base } from "@theme-ui/presets"

interface CustomTheme extends Omit<Theme, "colors"> {
  colors: any
}

export const theme: CustomTheme = {
  ...base,
  buttons: {
    primary: {
      color: "#f09",
      background: "red",
    },
  },
  styles: {
    ...base.styles,
  },
}
