const path = require("path")
const { version } = require("./package.json")

module.exports = {
  ignore: ["src/components/**/*.test.tsx", "src/components/**/*.stories.tsx"],
  version: `${version}`,
  styleguideComponents: {
    Wrapper: path.join(__dirname, "src/theme/ThemeWrapper"),
  },
  propsParser: require("react-docgen-typescript").parse,
  skipComponentsWithoutExample: true,
  sections: [
    {
      name: "Introduction",
      content: "./docs/index.md",
    },
    {
      name: "Components",
      content: "./docs/components.md",
      components: "src/components/**/*.tsx",
    },
  ],
  theme: {
    fontFamily: {
      base: "Gilroy",
    },
  },
  template: {
    head: {
      links: [
        {
          rel: "stylesheet",
          href: "https://storage.googleapis.com/cndcdn/stylesheet.css",
        },
      ],
    },
  },
}
