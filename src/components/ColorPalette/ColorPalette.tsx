/** @jsxRuntime classic /
/** @jsx jsx */
import { HerzUIColors, HerzUITheme, jsx, useThemeUI } from "theme-ui"
import { useMemo } from "react"
import {
  DEFAULT_SHADE_PERCENTAGES,
  DEFAULT_TINT_PERCENTAGES,
} from "../../theme/theme"

const ColorPalette = () => {
  const { theme } = useThemeUI()

  const colors: Array<keyof Omit<HerzUIColors, "background">> = useMemo(() => {
    return Object.keys(theme.colors).filter(
      (color) => !["background", "modes"].includes(color)
    ) as Array<keyof Omit<HerzUIColors, "background">>
  }, [theme])

  return (
    <div
      sx={{
        display: "grid",
        gridAutoFlow: "row",
        gap: 6,
      }}
    >
      {colors.map((color) => (
        <div key={color} sx={{ variant: "text.heading1", color: "text" }}>
          {color.toUpperCase()}
          <div
            sx={{
              display: "grid",
              gridAutoFlow: "column",
              gridTemplateColumns: `repeat(${
                DEFAULT_SHADE_PERCENTAGES.length +
                DEFAULT_TINT_PERCENTAGES.length +
                1
              }, minmax(0, 1fr))`,
              gap: 2,
              variant: "text.heading2",
              fontWeight: "medium",
              textAlign: "center",
            }}
          >
            {DEFAULT_SHADE_PERCENTAGES.reverse().map((shade) => (
              <div key={shade}>
                Shade {shade}%
                <div
                  sx={{
                    height: 100,
                    backgroundColor: (theme: HerzUITheme) =>
                      theme.colors[color].shade[shade],
                  }}
                />
                {theme.colors[color].shade[shade].toUpperCase()}
              </div>
            ))}
            <div sx={{ fontWeight: "bold" }}>
              Original
              <div
                sx={{
                  height: 100,
                  backgroundColor: (theme: HerzUITheme) =>
                    theme.colors[color][0],
                }}
              />
              {theme.colors[color][0].toUpperCase()}
            </div>
            {DEFAULT_TINT_PERCENTAGES.map((tint) => (
              <div key={tint}>
                Tint {tint}%
                <div
                  sx={{
                    height: 50,
                    backgroundColor: (theme: HerzUITheme) =>
                      theme.colors[color][tint],
                  }}
                />
                <div
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 50,
                    variant: "text.body2",
                    color: "text.40",
                    backgroundColor: (theme: HerzUITheme) =>
                      theme.colors[color].alpha[tint],
                  }}
                >
                  alpha
                </div>
                {theme.colors[color][tint].toUpperCase()}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ColorPalette
