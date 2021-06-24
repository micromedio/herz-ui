/** @jsxImportSource theme-ui */
import { useMemo } from "react"
import { useThemeUI, get } from "theme-ui"

export interface SpinnerProps {
  color?: "primary" | "secondary" | "text"
  size?: number
}

const Spinner = ({ color = "secondary", size = 20 }: SpinnerProps) => {
  const { theme } = useThemeUI()

  const colorValue = useMemo(() => {
    if (color === "text") return get(theme, "colors.text.40")
    return theme.colors?.[color]?.[0] ?? get(theme, "colors.text.40")
  }, [color, theme])

  return (
    <svg
      sx={{
        animationName: "spin",
        animationDuration: "1200ms",
        animationIterationCount: "infinite",
        animationTimingFunction: "linear",
        "@keyframes spin": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
      }}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 3.03332C7.31724 2.50288 8.79125 2.51745 10.0977 3.0738C11.4043 3.63016 12.4362 4.68274 12.9667 5.99998C13.4971 7.31722 13.4825 8.79123 12.9262 10.0977C12.3698 11.4042 11.3172 12.4362 10 12.9666"
        stroke={colorValue}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.75293 4.77344V4.7801"
        stroke="#E8E8E9"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.70703 7.33325V7.33992"
        stroke="#E8E8E9"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.08691 10.0667V10.0733"
        stroke="#E8E8E9"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.77344 12.2466V12.2532"
        stroke="#E8E8E9"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.33301 13.2932V13.2999"
        stroke="#E8E8E9"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Spinner
