import { Theme } from "theme-ui"
import { GeneratedColors } from "../helpers/colors"
import * as CSS from "csstype"

declare module "theme-ui" {
  interface HerzUIColors {
    primary: GeneratedColors
    secondary: GeneratedColors
    success: GeneratedColors
    text: GeneratedColors

    background: CSS.Property.Color
  }

  interface HerzUITheme extends Omit<Theme, "colors"> {
    colors: HerzUIColors & {
      modes?: {
        [k: string]: HerzUIColors
      }
    }
  }

  export interface ThemeUIContext {
    theme: HerzUITheme
    colorMode: string
    setColorMode: React.Dispatch<React.SetStateAction<string>>
  }

  export function useThemeUI(): ThemeUIContext
}
