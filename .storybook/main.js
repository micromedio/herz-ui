module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "@storybook/addon-a11y",
    "@storybook/addon-measure",
    "storybook-addon-outline",
  ],
  // only use vite builder for development
  ...(process.env.NODE_ENV !== 'production' ?
    {
      core: {
        builder: "storybook-builder-vite"
      },
      async viteFinal(config) {
        // customize the Vite config here
        config.esbuild = {
          jsxFactory: "jsx",
          jsxInject: 'import { jsx } from "theme-ui"',
        }

        // return the customized config
        return config;
      }
    }
  :{})
}
