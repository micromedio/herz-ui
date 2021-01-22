const path = require("path")
const { version } = require("./package.json")

module.exports = {
  version: `${version}`,
  styleguideComponents: {
    Wrapper: path.join(__dirname, "src/theme/ThemeWrapper"),
  },
  propsParser: require("react-docgen-typescript").parse,
  sections: [
    {
      name: "introduction",
      content: "./docs/index.md",
    },
    {
      name: "components",
      content: "./docs/components.md",
      skipComponentsWithoutExample: true,
      components: "src/components/**/*.tsx",
    },
  ],
  styles: {
    Playground: {
      preview: {
        background: "#FBFBFD",
      },
    },
  },
}
