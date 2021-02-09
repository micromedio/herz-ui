import React, { useMemo } from "react"
import { Box } from "theme-ui"

export interface PaperProps {
  /** Paper elevation */
  elevation?: number
  /** The content of the component */
  children?: React.ReactNode
}

const Paper = ({ elevation = 1, children }: PaperProps) => {
  const boxShadow = useMemo(() => {
    if (elevation === 1) return "0px 1px 12px rgba(0, 0, 0, 0.04);"
    if (elevation >= 2) return "0px 1px 12px rgba(0, 0, 0, 0.16)"

    return "none"
  }, [elevation])

  return (
    <Box
      padding={6}
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
