import React from "react";
import ThemeWrapper from "../src/theme/ThemeWrapper"
import "normalize.css"
import "./global.css"

export const decorators = [
  (Story) => (
    <ThemeWrapper>
      <Story />
    </ThemeWrapper>
  ),
]

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    default: "white",
    values: [
      {
        name: "light",
        value: "#f8f8f8"
      },
      {
        name: "dark",
        value: "#333333"
      },
      {
        name: "white",
        value: "#fff"
      },
    ]
  }
}
