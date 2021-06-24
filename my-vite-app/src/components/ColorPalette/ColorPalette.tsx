/** @jsxImportSource theme-ui */
import { useThemeUI, get } from "theme-ui"
import { useMemo } from "react"
import {
  DEFAULT_SHADE_PERCENTAGES,
  DEFAULT_TINT_PERCENTAGES,
} from "../../theme/theme"

const ColorPalette = () => {
  const { theme } = useThemeUI()

  const colors = useMemo(() => {
    return Object.keys(theme.colors as Record<string, unknown>).filter(
      (color) => !["background", "modes", "muted"].includes(color)
    )
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
          {color?.toUpperCase()}
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
                    backgroundColor: (t) =>
                      get(t, `colors.${color}.shade.${shade}`),
                  }}
                />
                {get(theme, `rawColors.${color}.shade.${shade}`)?.toUpperCase()}
              </div>
            ))}
            <div sx={{ fontWeight: "bold" }}>
              Original
              <div
                sx={{
                  height: 100,
                  backgroundColor: (t) => get(t, `colors.${color}`),
                }}
              />
              {get(theme, `rawColors.${color}`)?.toUpperCase()}
            </div>
            {DEFAULT_TINT_PERCENTAGES.map((tint) => (
              <div key={tint}>
                Tint {tint}%
                <div
                  sx={{
                    height: 50,
                    backgroundColor: (t) => get(t, `colors.${color}.${tint}`),
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
                    backgroundColor: (t) =>
                      get(t, `colors.${color}.alpha.${tint}`),
                  }}
                >
                  alpha
                </div>
                {get(theme, `rawColors.${color}.${tint}`)?.toUpperCase()}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ColorPalette
