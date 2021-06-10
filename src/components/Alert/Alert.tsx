/** @jsxImportSource theme-ui */

import { ReactNode } from "react"
import Icon, { IconProps } from "../Icon/Icon"
import Paper from "../Paper/Paper"

export interface AlertProps {
  /** Alert title */
  title: string

  /** Description content */
  children: ReactNode

  /** The alert icon from tabler */
  iconName?: IconProps["name"]

  /** custom Alert icon */
  iconSVG?: ReactNode

  color: string

  position: "fixed" | "relative"
}

const Alert = ({
  title,
  children,
  iconName,
  iconSVG,
  color,
  position = "relative",
}: AlertProps) => {
  return (
    <Paper
      elevation={0}
      padding={0}
      sx={
        position === "relative"
          ? {
              display: "flex",
              gap: 3,
              p: 6,
              border: "2px solid",
              borderColor: `${color}.40`,
              backgroundColor: `${color}.95`,
              borderRadius: 3,
            }
          : {
              display: "flex",
              gap: 3,
              p: 6,
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              zIndex: 99,
              borderBottom: "2px solid",
              borderColor: `${color}.40`,
              backgroundColor: `${color}.95`,
              borderRadius: 0,
            }
      }
    >
      <span sx={{ width: 20, height: 20 }}>
        {iconName ? <Icon name={iconName} /> : iconSVG ? iconSVG : ""}
      </span>
      <div>
        <h2 sx={{ variant: "text.heading2", margin: 0, paddingBottom: 3 }}>
          {title}
        </h2>
        <div sx={{ variant: "text.body1", color: "text.40" }}>
          {children}
        </div>
      </div>
    </Paper>
  )
}

export default Alert
