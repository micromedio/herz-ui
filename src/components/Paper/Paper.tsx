import React, { useMemo } from "react"
import { Box } from "theme-ui"

export interface PaperProps {
  /** Paper elevation */
  elevation?: number
  /** Paper inside padding */
  padding?: number
  /** The content of the component */
  children?: React.ReactNode
}

const Paper = ({ elevation = 1, padding = 6, children }: PaperProps) => {
  const boxShadow = useMemo(() => {
    if (elevation === 1) return "0px 1px 12px rgba(0, 0, 0, 0.04);"
    if (elevation >= 2) return "0px 1px 12px rgba(0, 0, 0, 0.16)"

    return "none"
  }, [elevation])

  return (
    <Box
      p={padding}
      bg="#FFF"
      sx={{
        borderRadius: 4,
        boxShadow,
      }}
    >
      {children}
    </Box>
  )
}

export default Paper
