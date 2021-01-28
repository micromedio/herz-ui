import React from "react";
import ThemeWrapper from '../src/theme/ThemeWrapper';
import "./styles.css"

export const decorators = [
  (Story) => (
    <ThemeWrapper>
      <Story />
    </ThemeWrapper>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
